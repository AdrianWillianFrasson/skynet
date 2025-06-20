import { actions } from "astro:actions";
import type { EChartsOption } from "echarts";
import { useWebSocket } from "partysocket/react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EChart } from "@/components/ui/EChart";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";

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

  const [dataX, setDataX] = useState<number[]>([]);
  const [dataP1, setDataP1] = useState<number[]>([]);
  const [dataP2, setDataP2] = useState<number[]>([]);
  const [dataP3, setDataP3] = useState<number[]>([]);

  const [names, setNames] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

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

  const option: EChartsOption = useMemo(
    () => ({
      dataZoom: [
        {
          end: 100,
          start: 0,
          type: "inside",
        },
        {
          end: 100,
          start: 0,
        },
      ],
      legend: {
        data: ["Peso 1", "Peso 2", "Peso 3"],
      },
      series: [
        {
          data: dataP1,
          lineStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.3)",
            shadowOffsetY: 8,
            width: 3,
          },
          name: "Peso 1",
          smooth: true,
          type: "line",
        },
        {
          data: dataP2,
          lineStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.3)",
            shadowOffsetY: 8,
            width: 3,
          },
          name: "Peso 2",
          smooth: true,
          type: "line",
        },
        {
          data: dataP3,
          lineStyle: {
            color: "#ee6666",
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.3)",
            shadowOffsetY: 8,
            width: 3,
          },
          name: "Peso 3",
          smooth: true,
          type: "line",
        },
      ],
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        data: dataX,
        type: "category",
      },
      yAxis: {
        type: "value",
      },
    }),
    [dataX, dataP1, dataP2, dataP3],
  );

  const ws = useWebSocket(url, undefined, {
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

      if ("p1" in parsedData) {
        if (dataX.length >= 20) {
          setDataX((old) => [...old.slice(1), event.timeStamp]);
          setDataP1((old) => [...old.slice(1), parsedData?.p1 as number]);
          setDataP2((old) => [...old.slice(1), parsedData?.p2 as number]);
          setDataP3((old) => [...old.slice(1), parsedData?.p3 as number]);
        } else {
          setDataX((old) => [...old, event.timeStamp]);
          setDataP1((old) => [...old, parsedData?.p1 as number]);
          setDataP2((old) => [...old, parsedData?.p2 as number]);
          setDataP3((old) => [...old, parsedData?.p3 as number]);
        }
      }

      setData((old) => ({ ...old, ...parsedData }));
    },
    onOpen(_) {
      ws.send(JSON.stringify({ sync: 1 }));
    },
  });

  function sendData(event: React.ChangeEvent<HTMLInputElement>) {
    const cmd = event.target.value;
    const value = event.target.checked ? 1 : 0;

    ws.send(JSON.stringify({ [cmd]: value }));
  }

  return (
    <div className="flex flex-col md:flex-row size-full p-4 gap-4">
      <div className="flex flex-col gap-4">
        <Card className="size-full text-nowrap">
          <div className="flex flex-col size-full">
            <span>{`Peso 1: ${data.p1} kg`}</span>
            <span>{`Peso 2: ${data.p2} kg`}</span>
            <span>{`Peso 3: ${data.p3} kg`}</span>
          </div>
        </Card>

        <Card className="size-full gap-1 text-nowrap">
          <Select onChange={setName} options={names} value={name} />
          <Button
            className="btn btn-neutral"
            onClick={async () => {
              const { data, error } = await actions.user.getAll();

              if (!error) {
                setNames(data.map((user) => user.name));
              }
            }}>
            Atualizar
          </Button>
        </Card>

        <Card className="size-full gap-1 text-nowrap">
          <div className="flex">
            <span>RLY 1:</span>
            <Toggle checked={data.rly1} onChange={sendData} value={"rly1"} />
          </div>
          <div className="flex">
            <span>RLY 2:</span>
            <Toggle checked={data.rly2} onChange={sendData} value={"rly2"} />
          </div>
          <div className="flex">
            <span>RLY 3:</span>
            <Toggle checked={data.rly3} onChange={sendData} value={"rly3"} />
          </div>
          <div className="flex">
            <span>RLY 4:</span>
            <Toggle checked={data.rly4} onChange={sendData} value={"rly4"} />
          </div>
          <div className="flex">
            <span>RLY 5:</span>
            <Toggle checked={data.rly5} onChange={sendData} value={"rly5"} />
          </div>
          <div className="flex">
            <span>RLY 6:</span>
            <Toggle checked={data.rly6} onChange={sendData} value={"rly6"} />
          </div>
        </Card>
      </div>

      <Card className="size-full">
        <EChart option={option} />
      </Card>
    </div>
  );
}
