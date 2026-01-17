"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function createAnalyzeAction(resumeGenerated: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  try {
    const analyze = await prisma.analyze.create({
      data: {
        userId,
        resumeData: resumeGenerated,
      },
    });

    return analyze;
  } catch (error) {
    throw new Error("Erro ao criar análise");
  }
}
