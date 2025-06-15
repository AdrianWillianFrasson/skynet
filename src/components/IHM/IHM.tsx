import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { useWebSocket } from "partysocket/react";

const DATA_PARSE_MAP: Record<string, (v: string) => number | boolean> = {
  p1: Number.parseFloat,
  p2: Number.parseFloat,
  p3: Number.parseFloat,
  rly1: (v: string) => v === "1",
  rly2: (v: string) => v === "1",
  rly3: (v: string) => v === "1",
  rly4: (v: string) => v === "1",
  rly5: (v: string) => v === "1",
  rly6: (v: string) => v === "1",
};

export function IHM() {
  const url = `ws://${window?.location?.hostname}:8000/ws`;

  const [data, setData] = useState({
    p1: 0,
    p2: 0,
    p3: 0,
    rly1: false,
    rly2: false,
    rly3: false,
    rly4: false,
    rly5: false,
    rly6: false,
  });

  const ws = useWebSocket(url, undefined, {
    onOpen(_) {
      ws.send(JSON.stringify({ sync: 1 }));
    },
    onMessage(event) {
      const newData = JSON.parse(event.data);

      const parsedData = Object.keys(DATA_PARSE_MAP).reduce(
        (acc, key) => {
          if (key in newData) {
            acc[key] = DATA_PARSE_MAP[key](newData?.[key]);
          }

          return acc;
        },
        {} as Record<string, number | boolean>,
      );

      setData((old) => ({ ...old, ...parsedData }));
    },
  });

  function sendData(event: React.ChangeEvent<HTMLInputElement>) {
    const cmd = event.target.value;
    const value = event.target.checked ? 1 : 0;

    ws.send(JSON.stringify({ [cmd]: value }));
  }

  return (
    <div className="flex size-full p-4 gap-4">
      <Card>
        <div className="flex flex-col size-full">
          <p className="flex justify-between gap-1">
            <span>Peso 1:</span>
            <span>{data.p1}</span>
            <span>kg</span>
          </p>
          <p className="flex justify-between gap-1">
            <span>Peso 2:</span>
            <span>{data.p2}</span>
            <span>kg</span>
          </p>
          <p className="flex justify-between gap-1">
            <span>Peso 3:</span>
            <span>{data.p3}</span>
            <span>kg</span>
          </p>
          <Button className="btn btn-neutral">test</Button>
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-2 size-full gap-1">
          <span>RLY 1:</span>
          <Toggle value={"rly1"} checked={data.rly1} onChange={sendData} />
          <span>RLY 2:</span>
          <Toggle value={"rly2"} checked={data.rly2} onChange={sendData} />
          <span>RLY 3:</span>
          <Toggle value={"rly3"} checked={data.rly3} onChange={sendData} />
          <span>RLY 4:</span>
          <Toggle value={"rly4"} checked={data.rly4} onChange={sendData} />
          <span>RLY 5:</span>
          <Toggle value={"rly5"} checked={data.rly5} onChange={sendData} />
          <span>RLY 6:</span>
          <Toggle value={"rly6"} checked={data.rly6} onChange={sendData} />
        </div>
      </Card>
    </div>
  );
}
