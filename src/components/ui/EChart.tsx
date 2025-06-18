import { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";
import type { EChartsOption, EChartsInitOpts } from "echarts";

const DEFAULT_OPTION = {
  grid: {
    top: "20",
    left: "15",
    right: "20",
    containLabel: true,
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
        width: "100%",
        height: "100%",
      }}
    />
  );
}
