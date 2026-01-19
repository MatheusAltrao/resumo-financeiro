"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validação de UUID
const analyzeIdSchema = z.string().uuid("ID da análise inválido");

export async function getAnalyzeByIdAction(analyzeId: string) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado");
  }

  // Validar formato do ID
  const validation = analyzeIdSchema.safeParse(analyzeId);
  if (!validation.success) {
    throw new Error("ID da análise inválido");
  }

  const userId = session.user.id;

  try {
    const analyze = await prisma.analyze.findFirst({
      where: {
        id: analyzeId,
        userId,
      },
    });

    if (!analyze) {
      throw new Error("Análise não encontrada");
    }

    return analyze;
  } catch (error) {
    console.error("Erro ao buscar análise:", error);
    throw new Error("Erro ao buscar análise");
  }
}
