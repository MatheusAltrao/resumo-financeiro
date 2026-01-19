"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  } catch (error) {
    console.error("Erro ao buscar o ID do cliente:", error);
    throw new Error("Erro ao buscar o ID do cliente");
  }
}
