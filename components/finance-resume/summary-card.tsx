import { GeneralSummary } from "@/types/finance-resume";
import { ArrowDown, ArrowRight, ArrowUp, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface SummaryCardProps {
  data: GeneralSummary;
}

export default function SummaryCard({ data }: SummaryCardProps) {
  const getClassificacaoColor = () => {
    switch (data.classification) {
      case "Positivo":
        return "text-emerald-600";
      case "Negativo":
        return "text-rose-600";
      default:
        return "text-amber-600";
    }
  };

  const getClassificacaoIcon = () => {
    switch (data.classification) {
      case "Positivo":
        return <ArrowUp className="h-5 w-5" />;
      case "Negativo":
        return <ArrowDown className="h-5 w-5" />;
      default:
        return <ArrowRight className="h-5 w-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
      {/* Card de Receitas */}
      <Card className="relative overflow-hidden border-l-4 border-l-emerald-500 bg-linear-to-br from-emerald-50 to-white hover:shadow-lg transition-shadow">
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Receitas</p>
              <p className="text-2xl font-bold text-emerald-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.totalIncome)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de Despesas */}
      <Card className="relative overflow-hidden border-l-4 border-l-rose-500 bg-linear-to-br from-rose-50 to-white hover:shadow-lg transition-shadow">
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Despesas</p>
              <p className="text-2xl font-bold text-rose-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.totalExpenses)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-rose-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de Saldo */}
      <Card
        className={`relative overflow-hidden border-l-4 ${
          data.finalBalance >= 0 ? "border-l-cyan-500 bg-linear-to-br from-cyan-50" : "border-l-orange-500 bg-linear-to-br from-orange-50"
        } to-white hover:shadow-lg transition-shadow`}
      >
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Saldo Final</p>
              <p className={`text-2xl font-bold ${data.finalBalance >= 0 ? "text-cyan-600" : "text-orange-600"}`}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.finalBalance)}
              </p>
            </div>
            <div className={`h-12 w-12 rounded-full ${data.finalBalance >= 0 ? "bg-cyan-100" : "bg-orange-100"} flex items-center justify-center`}>
              <Wallet className={`h-6 w-6 ${data.finalBalance >= 0 ? "text-cyan-600" : "text-orange-600"}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
