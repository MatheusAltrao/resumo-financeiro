"use client";

import { ExpenseDistribution } from "@/types/finance-resume";
import { ChartPieLabel } from "../charts/pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig } from "../ui/chart";

interface ExpensesDistributionChartProps {
  data: ExpenseDistribution[];
}

const COLORS = ["#06b6d4", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6", "#f97316"];

export default function ExpensesDistributionChart({ data }: ExpensesDistributionChartProps) {
  const totalGastos = data.reduce((sum, item) => sum + item.value, 0);

  // Prepare chart data with colors
  const chartData = data.map((item, index) => ({
    name: item.category,
    value: item.value,
    fill: COLORS[index % COLORS.length],
  }));

  // Create chart config
  const chartConfig = data.reduce((acc, item, index) => {
    const key = item.category.toLowerCase().replace(/\s+/g, "-");
    acc[key] = {
      label: item.category,
      color: COLORS[index % COLORS.length],
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">📊 Distribuição de Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <ChartPieLabel
            data={chartData}
            config={chartConfig}
            innerRadius={80}
            outerRadius={120}
            className="mx-auto aspect-square h-80"
            centerContent={
              <>
                <p className="text-sm text-muted-foreground font-medium">Total</p>
                <p className="text-xl font-bold text-cyan-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 0,
                  }).format(totalGastos)}
                </p>
              </>
            }
          />

          <div className="space-y-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow bg-linear-to-r from-white to-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full " style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="font-semibold text-sm">{item.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-base">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.value)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${item.percentage > 30 ? "text-rose-600" : "text-muted-foreground"}`}>
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
