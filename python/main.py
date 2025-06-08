from fastapi import FastAPI, WebSocket
import asyncio


class Count:
    def __init__(self):
        self.value = 0


count = Count()

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "hello world"}


@app.websocket("/ws")
async def ws(websocket: WebSocket):
    await websocket.accept()

    print("Client connected.")
    count.value = count.value + 1

    try:
        while True:
            data = {"message": f"Random number: {count.value}"}

            await websocket.send_text(str(data))
            await asyncio.sleep(1)

    except Exception as e:
        print(f"Error: {e}")
        count.value = count.value - 1

    finally:
        await websocket.close()

        count.value = count.value - 1
        print("Client disconnected.")
