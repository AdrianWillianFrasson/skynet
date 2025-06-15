from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket
from aioserial import AioSerial
import asyncio


# ------------------------------------------------------------------------------
class ClientsManager:
    def __init__(self):
        self.clients: list[WebSocket] = []

    def add_client(self, client: WebSocket):
        self.clients.append(client)

    def pop_client(self, client: WebSocket):
        if client in self.clients:
            self.clients.remove(client)

    async def broadcast(self, cmd: str, value: str):
        tasks = []

        for client in self.clients:
            try:
                tasks.append(client.send_json({cmd: value}))

            except Exception:
                clientsManager.pop_client(client)

        await asyncio.gather(*tasks, return_exceptions=True)


class SerialManager:
    def __init__(self):
        self.serial: AioSerial = None

    def set_serial(self, serial: AioSerial):
        self.serial = serial

    async def send_data(self, data: dict):
        print(data)
        if not (self.serial and self.serial.writable()):
            return

        tasks = []

        for key, value in data.items():
            tasks.append(self.serial.write_async(f"{key}:{value};".encode()))

        await asyncio.gather(*tasks, return_exceptions=True)


clientsManager = ClientsManager()
serialManager = SerialManager()


async def on_serial_data(data: str):
    cmd, value = data.split(":", 1)

    if not (cmd and value):
        return

    await clientsManager.broadcast(cmd, value)


async def open_serial():
    while True:
        try:
            serial = AioSerial(port="COM7", baudrate=115200)
            serialManager.set_serial(serial)

            while True:
                data_raw = await serial.read_until_async(b";")
                data = data_raw.decode(errors="ignore")

                asyncio.create_task(on_serial_data(data[:-1]))

        except Exception:
            try:
                serial.close()

            except Exception:
                pass

        await asyncio.sleep(1)


@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(open_serial())
    yield


app = FastAPI(lifespan=lifespan)


# ------------------------------------------------------------------------------
@app.get("/")
async def root():
    return {
        "status": "running",
        "clients": len(clientsManager.clients),
    }


@app.websocket("/ws")
async def ws(websocket: WebSocket):
    await websocket.accept()
    clientsManager.add_client(websocket)

    try:
        while True:
            data = await websocket.receive_json()
            asyncio.create_task(serialManager.send_data(data))

    except Exception:
        try:
            clientsManager.pop_client(websocket)
            await websocket.close()

        except Exception:
            pass
