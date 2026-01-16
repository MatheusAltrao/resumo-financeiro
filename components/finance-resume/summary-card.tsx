import { ResumoGeral } from "@/types/finance-resume";
import { ArrowDown, ArrowRight, ArrowUp, DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface SummaryCardProps {
  data: ResumoGeral;
}

export default function SummaryCard({ data }: SummaryCardProps) {
  const getClassificacaoColor = () => {
    switch (data.classificacao) {
      case "Positivo":
        return "text-emerald-600";
      case "Negativo":
        return "text-rose-600";
      default:
        return "text-amber-600";
    }
  };

  const getClassificacaoIcon = () => {
    switch (data.classificacao) {
      case "Positivo":
        return <ArrowUp className="h-5 w-5" />;
      case "Negativo":
        return <ArrowDown className="h-5 w-5" />;
      default:
        return <ArrowRight className="h-5 w-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card de Receitas */}
      <Card className="relative overflow-hidden border-l-4 border-l-emerald-500 bg-linear-to-br from-emerald-50 to-white hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Receitas</p>
              <p className="text-2xl font-bold text-emerald-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.totalReceitas)}
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
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Despesas</p>
              <p className="text-2xl font-bold text-rose-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.totalDespesas)}
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
          data.saldoFinal >= 0 ? "border-l-cyan-500 bg-linear-to-br from-cyan-50" : "border-l-orange-500 bg-linear-to-br from-orange-50"
        } to-white hover:shadow-lg transition-shadow`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Saldo Final</p>
              <p className={`text-2xl font-bold ${data.saldoFinal >= 0 ? "text-cyan-600" : "text-orange-600"}`}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.saldoFinal)}
              </p>
            </div>
            <div className={`h-12 w-12 rounded-full ${data.saldoFinal >= 0 ? "bg-cyan-100" : "bg-orange-100"} flex items-center justify-center`}>
              <Wallet className={`h-6 w-6 ${data.saldoFinal >= 0 ? "text-cyan-600" : "text-orange-600"}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de % Comprometido */}
      <Card
        className={`relative overflow-hidden border-l-4 ${
          data.classificacao === "Positivo"
            ? "border-l-teal-500 bg-linear-to-br from-teal-50"
            : data.classificacao === "Negativo"
            ? "border-l-amber-500 bg-linear-to-br from-amber-50"
            : "border-l-yellow-500 bg-linear-to-br from-yellow-50"
        } to-white hover:shadow-lg transition-shadow`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">% Comprometido</p>
              <div className="flex items-center gap-2">
                <p className={`text-2xl font-bold ${getClassificacaoColor()}`}>{data.percentualComprometido.toFixed(1)}%</p>
                <div className={getClassificacaoColor()}>{getClassificacaoIcon()}</div>
              </div>
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  data.classificacao === "Positivo"
                    ? "bg-emerald-100 text-emerald-700"
                    : data.classificacao === "Negativo"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {data.classificacao}
              </span>
            </div>
            <div
              className={`h-12 w-12 rounded-full ${
                data.classificacao === "Positivo" ? "bg-teal-100" : data.classificacao === "Negativo" ? "bg-amber-100" : "bg-yellow-100"
              } flex items-center justify-center`}
            >
              <DollarSign
                className={`h-6 w-6 ${
                  data.classificacao === "Positivo" ? "text-teal-600" : data.classificacao === "Negativo" ? "text-amber-600" : "text-yellow-600"
                }`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
