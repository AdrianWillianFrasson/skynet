import type { EChartsInitOpts, EChartsOption } from "echarts";
import { getInstanceByDom, init } from "echarts";
import { useEffect, useRef } from "react";

const DEFAULT_OPTION = {
  grid: {
    containLabel: true,
    left: "15",
    right: "20",
    top: "20",
  },
};

export function EChart({
  option,
  settings,
  theme,
}: {
  option: EChartsOption;
  settings?: EChartsInitOpts;
  theme?: "light" | "dark";
}): React.JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = init(chartRef.current, theme, settings);

    function resizeChart() {
      chart?.resize();
    }

    window.addEventListener("resize", resizeChart);

    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme, settings]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption({ ...DEFAULT_OPTION, ...option });
    }
  }, [option]);

  return (
    <div
      ref={chartRef}
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );
}
