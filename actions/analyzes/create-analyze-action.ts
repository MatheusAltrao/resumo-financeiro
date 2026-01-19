"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FinanceResume } from "@/types/finance-resume";

export async function createAnalyzeAction(resumeGenerated: string, fileName?: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  if (!resumeGenerated) {
    throw new Error("Resumo financeiro é obrigatório");
  }

  if (!fileName) {
    throw new Error("Nome do arquivo é obrigatório");
  }

  const userId = session.user.id;

  try {
    // Usar o nome do arquivo sem .csv como título
    let title = fileName ? fileName.replace(/\.csv$/i, "") : "Análise Financeira";
    let description = "Resumo financeiro detalhado";

    try {
      const resumeData: FinanceResume = JSON.parse(resumeGenerated);
      const balance = resumeData.generalSummary.finalBalance;

      // Gerar descrição baseada no saldo final
      if (balance > 0) {
        description = `O saldo final foi de R$ ${balance.toFixed(2).replace(".", ",")} (Positivo)`;
      } else if (balance < 0) {
        description = `O saldo final foi de R$ ${balance.toFixed(2).replace(".", ",")} (Negativo)`;
      } else {
        description = `O saldo final foi de R$ 0,00 (Neutro)`;
      }
    } catch {
      description = "Resumo financeiro detalhado";
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
