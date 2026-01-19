"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validação de CUID
const analyzeIdSchema = z.string().min(20, "ID da análise inválido").max(30, "ID da análise inválido");

export async function deleteAnalyzeAction(analyzeId: string) {
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
    // Verificar se existe e pertence ao usuário ANTES de deletar
    const analyze = await prisma.analyze.findUnique({
      where: { id: analyzeId },
      select: { userId: true },
    });

    if (!analyze) {
      throw new Error("Análise não encontrada");
    }

    if (analyze.userId !== userId) {
      throw new Error("Análise não encontrada");
    }

    // Agora sim, deletar
    await prisma.analyze.delete({
      where: { id: analyzeId },
    });

    revalidatePath("/analyzes");
  } catch (error) {
    console.error("Erro ao deletar análise:", error);
    throw new Error("Erro ao deletar análise");
  }
}
