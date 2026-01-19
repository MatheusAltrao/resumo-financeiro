import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ credits: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    return NextResponse.json({ credits: user?.credits || 0 });
  } catch (error) {
    console.error("Erro ao buscar créditos:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
