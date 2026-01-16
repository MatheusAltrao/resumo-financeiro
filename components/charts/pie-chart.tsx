"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

interface ChartPieData {
  name: string;
  value: number;
  fill: string;
}

interface ChartPieLabelProps {
  data: ChartPieData[];
  config: ChartConfig;
  dataKey?: string;
  nameKey?: string;
  innerRadius?: number;
  outerRadius?: number;
  showLabel?: boolean;
  centerContent?: React.ReactNode;
  className?: string;
}

export function ChartPieLabel({
  data,
  config,
  dataKey = "value",
  nameKey = "name",
  innerRadius = 0,
  outerRadius = 80,
  showLabel = false,
  centerContent,
  className,
}: ChartPieLabelProps) {
  return (
    <div className="relative">
      <ChartContainer config={config} className={className || "mx-auto aspect-square max-h-80"}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            label={showLabel}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            strokeWidth={2}
          />
        </PieChart>
      </ChartContainer>
      {centerContent && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">{centerContent}</div>
      )}
    </div>
  );
}
