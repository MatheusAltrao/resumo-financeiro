"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function createAnalyzeAction(resumeGenerated: string) {
  console.log("📝 createAnalyzeAction chamada");

  const session = await auth();

  if (!session || !session.user?.id) {
    console.error("❌ Usuário não autenticado");
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;
  console.log("👤 User ID:", userId);
  console.log("📊 Tamanho do resumo:", resumeGenerated.length, "caracteres");

  try {
    const analyze = await prisma.analyze.create({
      data: {
        userId,
        resumeData: resumeGenerated,
      },
    });

    console.log("✅ Análise criada com sucesso! ID:", analyze.id);
    return analyze;
  } catch (error) {
    console.error("❌ Erro ao criar análise:", error);
    throw new Error("Erro ao criar análise");
  }
}
