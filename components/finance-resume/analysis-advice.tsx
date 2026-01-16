"use client";

import { AnalystAdvice, Conclusion } from "@/types/finance-resume";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, Lightbulb, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AnalysisAdviceProps {
  padroes: string[];
  conselho: AnalystAdvice;
  conclusao: Conclusion;
  saldoFinal: number;
  percentualComprometido: number;
}

export default function AnalysisAdvice({ padroes, conselho, conclusao, saldoFinal = 0, percentualComprometido = 0 }: AnalysisAdviceProps) {
  // Calculate financial health score (0-100)
  const calculateHealthScore = () => {
    let score = 50; // Base score

    // Positive balance adds points
    if (saldoFinal > 0) {
      score += Math.min(25, saldoFinal / 100);
    } else {
      score -= Math.min(25, Math.abs(saldoFinal) / 100);
    }

    // Lower percentage committed is better
    if (percentualComprometido < 70) {
      score += 25;
    } else if (percentualComprometido < 90) {
      score += 15;
    } else if (percentualComprometido < 100) {
      score += 5;
    } else {
      score -= 15;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const healthScore = calculateHealthScore();
  const scoreColor = healthScore >= 70 ? "text-emerald-600" : healthScore >= 40 ? "text-amber-600" : "text-rose-600";
  const scoreLabel = healthScore >= 70 ? "Saudável" : healthScore >= 40 ? "Atenção" : "Crítico";
  const scoreBgColor = healthScore >= 70 ? "from-emerald-50 to-teal-50" : healthScore >= 40 ? "from-amber-50 to-yellow-50" : "from-rose-50 to-red-50";
  const borderColor = healthScore >= 70 ? "border-emerald-400" : healthScore >= 40 ? "border-amber-400" : "border-rose-400";

  return (
    <div className="space-y-6">
      {/* Financial Health Score */}
      <Card className={`border-2 bg-linear-to-br ${scoreBgColor} ${borderColor} `}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-6 w-6 text-cyan-600" />
            Score de Saúde Financeira
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="relative">
                <svg className="w-40 h-40" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={healthScore >= 70 ? "#10b981" : healthScore >= 40 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="10"
                    strokeDasharray={`${(healthScore / 100) * 314} 314`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${scoreColor}`}>{healthScore}</span>
                  <span className="text-xs text-muted-foreground font-medium">de 100</span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div
                className={`inline-block px-4 py-2 rounded-full font-bold ${scoreColor} ${
                  healthScore >= 70 ? "bg-emerald-100" : healthScore >= 40 ? "bg-amber-100" : "bg-rose-100"
                }`}
              >
                {scoreLabel}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${saldoFinal >= 0 ? "bg-emerald-500" : "bg-rose-500"}`} />
                  <span>Saldo: {saldoFinal >= 0 ? "Positivo" : "Negativo"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      percentualComprometido < 70 ? "bg-emerald-500" : percentualComprometido < 90 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                  />
                  <span>Comprometimento: {percentualComprometido.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Análise de Padrões */}
        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="bg-linear-to-r ">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-cyan-600" />
              Análise de Padrões
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {padroes.map((padrao, index) => (
                <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Info className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                  <span className="text-sm">{padrao}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Riscos Financeiros */}
        <Card className="border-l-4 border-l-rose-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-rose-700">
              <AlertTriangle className="h-5 w-5" />
              Riscos Identificados
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {conselho.financialRisks.map((risco: string, index: number) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-rose-50 border border-rose-100">
                  <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-rose-900">{risco}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="h-6 w-6 text-emerald-600" />
            Recomendações Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sugestões Práticas - Alta Prioridade */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-emerald-700">Ações Recomendadas</h4>
              </div>
              {conselho.practicalSuggestions.map((sugestao: string, index: number) => (
                <div key={index} className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <p className="text-sm font-medium text-emerald-900">{sugestao}</p>
                </div>
              ))}
            </div>

            {/* Próximos Passos - Média Prioridade */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                  <Target className="h-4 w-4 text-cyan-600" />
                </div>
                <h4 className="font-bold text-cyan-700">Próximos Passos</h4>
              </div>
              {conselho.nextSteps.map((passo: string, index: number) => (
                <div key={index} className="p-3 rounded-lg border border-cyan-200 bg-cyan-50/50 hover:bg-cyan-50 transition-colors">
                  <p className="text-sm font-medium text-cyan-900">{passo}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conclusão Executiva */}
      <Card className="border-2 border-cyan-500 shadow-lg">
        <CardHeader className="bg-linear-to-r  ">
          <CardTitle className="text-xl">📋 Conclusão Executiva</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase mb-2">Situação Atual</p>
              <p className="text-sm font-medium text-gray-800">{conclusao.currentSituation}</p>
            </div>
            <div className="p-4 rounded-lg bg-linear-to-br from-amber-50 to-orange-50 border border-amber-100">
              <p className="text-xs font-bold text-amber-600 uppercase mb-2">Principal Atenção</p>
              <p className="text-sm font-medium text-gray-800">{conclusao.mainConcern}</p>
            </div>
            <div className="p-4 rounded-lg bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-600 uppercase mb-2">Melhor Ação</p>
              <p className="text-sm font-medium text-gray-800">{conclusao.bestAction}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
