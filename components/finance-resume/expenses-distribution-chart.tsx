"use client";

import { DistribuicaoGasto } from "@/types/finance-resume";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ExpensesDistributionChartProps {
  data: DistribuicaoGasto[];
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

export default function ExpensesDistributionChart({ data }: ExpensesDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: item.categoria,
    value: item.valor,
    percentual: item.percentual,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Distribuição de Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentual }) => `${percentual.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(value)
                }
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="font-medium">{item.categoria}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor)}
                  </p>
                  <p className={`text-sm ${item.percentual > 30 ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
                    {item.percentual.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
