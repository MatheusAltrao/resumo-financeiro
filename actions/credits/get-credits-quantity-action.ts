import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCreditsQuantityAction() {
  const session = await auth();

  if (!session || !session.user) {
    return 0;
  }

  const userId = session.user.id;

  try {
    const credits = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    return credits?.credits || 0;
  } catch (error) {
    console.log("Erro ao buscar créditos do usuário:", error);
    throw new Error("Erro ao buscar créditos do usuário");
  }
}
