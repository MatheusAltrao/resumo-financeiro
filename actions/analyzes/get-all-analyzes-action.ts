"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function getAllAnalyzesAction() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  try {
    const analyzes = await prisma.analyze.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return analyzes;
  } catch (error) {
    console.error("Erro ao buscar análises:", error);
    throw new Error("Erro ao buscar análises");
  }
}
