from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket
import aioserial
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

    async def broadcast(self, message: str):
        for client in self.clients:
            try:
                await client.send_text(message)

            except Exception:
                clientsManager.pop_client(client)


clientsManager = ClientsManager()


async def read_serial():
    while True:
        try:
            serial = aioserial.AioSerial(port="COM7")

            while True:
                data_raw = await serial.read_until_async(b";")
                data = data_raw.decode(errors="ignore")

                await clientsManager.broadcast(data)

        except Exception:
            try:
                serial.close()

            except Exception:
                pass

        await asyncio.sleep(1)


@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(read_serial())
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
            data = await websocket.receive_text()
            print(data)

    except Exception:
        try:
            clientsManager.pop_client(websocket)
            await websocket.close()

        except Exception:
            pass
