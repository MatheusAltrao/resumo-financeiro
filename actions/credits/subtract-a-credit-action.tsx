"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function subtractACredit() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  try {
    // Transação atômica para prevenir race condition
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
        credits: { gt: 0 }, // Só atualiza se créditos > 0
      },
      data: {
        credits: { decrement: 1 },
      },
      select: {
        credits: true,
      },
    });

    return true;
  } catch (error) {
    // Se falhou, é porque não tem créditos ou erro de DB
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      throw new Error("Créditos insuficientes");
    }
    console.error("Erro ao subtrair crédito:", error);
    throw new Error("Erro ao processar créditos");
  }
}
