"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FinanceResume } from "@/types/finance-resume";

export async function createAnalyzeAction(resumeGenerated: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  try {
    // Gerar título e descrição baseados nos dados
    const now = new Date();
    const monthYear = now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    const title = `Análise Financeira - ${monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}`;

    let description = "Resumo financeiro detalhado";

    // Tentar extrair informações do resumo para criar uma descrição melhor
    try {
      const resumeData: FinanceResume = JSON.parse(resumeGenerated);
      const balance = resumeData.generalSummary.finalBalance;
      const classification = resumeData.generalSummary.classification;

      if (balance > 0) {
        description = `Saldo positivo de R$ ${balance.toFixed(2).replace(".", ",")} - Situação ${classification}`;
      } else if (balance < 0) {
        description = `Déficit de R$ ${Math.abs(balance).toFixed(2).replace(".", ",")} - Situação ${classification}`;
      } else {
        description = `Saldo neutro - Situação ${classification}`;
      }
    } catch {
      // Se falhar ao parsear, usa a descrição padrão
      description = "Resumo financeiro detalhado gerado pela IA";
    }

    const analyze = await prisma.analyze.create({
      data: {
        userId,
        title,
        description,
        resumeData: resumeGenerated,
      },
    });

    return analyze;
  } catch (error) {
    throw new Error("Erro ao criar análise");
  }
}
