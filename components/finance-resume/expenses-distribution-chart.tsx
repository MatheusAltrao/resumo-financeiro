"use client";

import { DistribuicaoGasto } from "@/types/finance-resume";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ExpensesDistributionChartProps {
  data: DistribuicaoGasto[];
}

const COLORS = ["#06b6d4", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6", "#f97316"];

export default function ExpensesDistributionChart({ data }: ExpensesDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: item.categoria,
    value: item.valor,
    percentual: item.percentual,
  }));

  const totalGastos = data.reduce((sum, item) => sum + item.valor, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">📊 Distribuição de Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  labelLine={false}
                  label={({ percentual }) => `${percentual.toFixed(1)}%`}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#fff"
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
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "8px 12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-sm text-muted-foreground font-medium">Total</p>
              <p className="text-xl font-bold text-cyan-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                }).format(totalGastos)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full ring-2 ring-offset-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length], ringColor: COLORS[index % COLORS.length] + "40" }}
                  />
                  <span className="font-semibold text-sm">{item.categoria}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-base">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.valor)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.percentual}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${item.percentual > 30 ? "text-rose-600" : "text-muted-foreground"}`}>
                      {item.percentual.toFixed(1)}%
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
