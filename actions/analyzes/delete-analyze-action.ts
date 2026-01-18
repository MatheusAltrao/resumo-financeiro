"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteAnalyzeAction(analyzeId: string) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  try {
    await prisma.analyze.delete({
      where: {
        id: analyzeId,
        userId: userId,
      },
    });

    revalidatePath("/analyzes");
  } catch (error) {
    console.error("Erro ao deletar análise:", error);
    throw new Error("Erro ao deletar análise");
  }
}
