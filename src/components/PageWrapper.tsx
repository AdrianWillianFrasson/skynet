import { useState } from "react";
import { Button } from "@/components/base/Button";
import { useWebSocket } from "partysocket/react";

export function PageWrapper() {
  const [data, setData] = useState("");

  const ws = useWebSocket("ws://localhost:8000/ws", undefined, {
    onMessage(event) {
      setData(event.data);
    },
  });

  return (
    <div>
      <span>data: {data}</span>
      <Button onClick={() => ws.send("test")} />
    </div>
  );
}
