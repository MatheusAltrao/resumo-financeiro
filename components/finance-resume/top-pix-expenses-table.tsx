import { TopPixExpense } from "@/types/finance-resume";
import { ArrowUpCircle, TrendingUp, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface TopPixExpensesTableProps {
  data: TopPixExpense[];
}

export default function TopPixExpensesTable({ data }: TopPixExpensesTableProps) {
  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `#${index + 1}`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyan-600" />
          Top Resultados via Pix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((pix, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-2 hover:shadow-xl transition-all  "
              style={{
                borderColor: index < 3 ? (index === 0 ? "#fbbf24" : index === 1 ? "#94a3b8" : "#d97706") : "#e5e7eb",
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{
                        background:
                          index < 3
                            ? index === 0
                              ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                              : index === 1
                              ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
                              : "linear-gradient(135deg, #d97706 0%, #b45309 100%)"
                            : "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                      }}
                    >
                      {index < 3 ? getMedalEmoji(index) : <User className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm leading-tight line-clamp-2">{pix.receiver}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Transações</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-700">
                      {pix.quantity}x
                    </span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">Valor Total</span>
                      <ArrowUpCircle className="h-4 w-4 text-rose-500" />
                    </div>
                    <p className="text-xl font-bold text-rose-600 mt-1">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(pix.value)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
