import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Webhook de compra de créditos ativo" });
}
