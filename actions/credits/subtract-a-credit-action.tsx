"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCreditsQuantityAction } from "./get-credits-quantity-action";

export async function subtractACredit() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  try {
    const credits = await getCreditsQuantityAction();

    if (credits <= 0) {
      throw new Error("Créditos insuficientes");
    }

    await prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: 1 } },
    });

    return true;
  } catch (error) {
    console.log("Erro ao subtrair crédito do usuário:", error);
    throw new Error("Erro ao subtrair crédito do usuário");
  }
}
