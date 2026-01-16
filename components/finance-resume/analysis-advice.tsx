import { Conclusao, ConselhoAnalista } from "@/types/finance-resume";
import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AnalysisAdviceProps {
  padroes: string[];
  conselho: ConselhoAnalista;
  conclusao: Conclusao;
}

export default function AnalysisAdvice({ padroes, conselho, conclusao }: AnalysisAdviceProps) {
  return (
    <div className="space-y-4">
      {/* Análise de Padrões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            🧠 Análise de Padrões Financeiros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {padroes.map((padrao, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{padrao}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Conselho do Analista */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            🧑‍💼 Conselho do Analista Financeiro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Maiores Gastos */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              Maiores Gastos
            </h4>
            <ul className="space-y-1 ml-6">
              {conselho.maioresGastos.map((gasto, index) => (
                <li key={index} className="text-sm">
                  • {gasto}
                </li>
              ))}
            </ul>
          </div>

          {/* Riscos Financeiros */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              Riscos Financeiros
            </h4>
            <ul className="space-y-1 ml-6">
              {conselho.riscosFinanceiros.map((risco, index) => (
                <li key={index} className="text-sm text-red-600">
                  • {risco}
                </li>
              ))}
            </ul>
          </div>

          {/* Sugestões Práticas */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              Sugestões Práticas
            </h4>
            <ul className="space-y-1 ml-6">
              {conselho.sugestoesPraticas.map((sugestao, index) => (
                <li key={index} className="text-sm">
                  • {sugestao}
                </li>
              ))}
            </ul>
          </div>

          {/* Próximos Passos */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-600">
              <TrendingUp className="h-4 w-4" />
              Próximos Passos
            </h4>
            <ul className="space-y-1 ml-6">
              {conselho.proximosPassos.map((passo, index) => (
                <li key={index} className="text-sm">
                  • {passo}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Conclusão Executiva */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle>🧾 Conclusão Executiva</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Situação Atual</p>
            <p className="font-medium">{conclusao.situacaoAtual}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Principal Ponto de Atenção</p>
            <p className="font-medium text-orange-600">{conclusao.principalAtencao}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Melhor Ação para o Próximo Mês</p>
            <p className="font-medium text-green-600">{conclusao.melhorAcao}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
