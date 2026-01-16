import { ResumoGeral } from "@/types/finance-resume";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface SummaryCardProps {
  data: ResumoGeral;
}

export default function SummaryCard({ data }: SummaryCardProps) {
  const getClassificacaoColor = () => {
    switch (data.classificacao) {
      case "Positivo":
        return "text-green-600";
      case "Negativo":
        return "text-red-600";
      default:
        return "text-yellow-600";
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
    <Card>
      <CardHeader>
        <CardTitle>📌 Resumo Geral do Período</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total de Receitas</p>
            <p className="text-2xl font-bold text-green-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(data.totalReceitas)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total de Despesas</p>
            <p className="text-2xl font-bold text-red-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(data.totalDespesas)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Saldo Final</p>
            <p className={`text-2xl font-bold ${data.saldoFinal >= 0 ? "text-green-600" : "text-red-600"}`}>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(data.saldoFinal)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">% Comprometido</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${getClassificacaoColor()}`}>{data.percentualComprometido.toFixed(1)}%</p>
              <div className={getClassificacaoColor()}>{getClassificacaoIcon()}</div>
            </div>
            <p className={`text-xs font-medium ${getClassificacaoColor()}`}>{data.classificacao}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
