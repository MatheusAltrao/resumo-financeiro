import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

// Public HMAC key do AbacatePay
const ABACATEPAY_PUBLIC_KEY =
  "t9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9";

/**
 * Verifica se a assinatura do webhook corresponde ao HMAC esperado.
 */
function verifyAbacateSignature(rawBody: string, signatureFromHeader: string): boolean {
  const bodyBuffer = Buffer.from(rawBody, "utf8");

  const expectedSig = crypto.createHmac("sha256", ABACATEPAY_PUBLIC_KEY).update(bodyBuffer).digest("base64");

  const A = Buffer.from(expectedSig);
  const B = Buffer.from(signatureFromHeader);

  return A.length === B.length && crypto.timingSafeEqual(A, B);
}

interface WebhookEvent {
  id: string;
  event: "billing.paid" | "withdraw.done" | "withdraw.failed";
  devMode: boolean;
  data: {
    payment?: {
      amount: number;
      fee: number;
      method: string;
    };
    pixQrCode?: {
      amount: number;
      id: string;
      kind: string;
      status: string;
      customerId?: string;
    };
    billing?: {
      id: string;
      amount: number;
      customer: {
        id: string;
        metadata: {
          name: string;
          email: string;
          cellphone: string;
          taxId: string;
          zipCode: string;
          country: string;
        };
      };
      frequency: string;
      kind: string[];
      status: string;
      products: Array<{
        id: string;
        externalId: string;
        quantity: number;
      }>;
      paidAmount: number;
    };
    transaction?: {
      id: string;
      status: string;
      kind: string;
      amount: number;
      externalId?: string;
    };
  };
}

// Set para armazenar eventos já processados (em produção, use banco de dados)
const processedEvents = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    // 1) Validação do secret na URL
    const webhookSecret = request.nextUrl.searchParams.get("webhookSecret");

    if (!webhookSecret || webhookSecret !== process.env.WEBHOOK_SECRET) {
      console.error("❌ Webhook secret inválido");
      return NextResponse.json({ error: "Invalid webhook secret" }, { status: 401 });
    }

    // 2) Ler o corpo bruto da requisição
    const rawBody = await request.text();

    // 3) Validação da assinatura HMAC
    const signature = request.headers.get("X-Webhook-Signature");

    if (!signature) {
      console.error("❌ Assinatura do webhook não encontrada");
      return NextResponse.json({ error: "Missing webhook signature" }, { status: 401 });
    }

    if (!verifyAbacateSignature(rawBody, signature)) {
      console.error("❌ Assinatura do webhook inválida");
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    // 4) Parse do evento
    const event: WebhookEvent = JSON.parse(rawBody);

    // 5) Verificar se o evento já foi processado (idempotência)
    if (processedEvents.has(event.id)) {
      console.log(`⚠️ Evento ${event.id} já foi processado`);
      return NextResponse.json({ received: true, message: "Event already processed" });
    }

    // 6) Processar o evento
    console.log(`📦 Evento recebido:  data: ${event.data})`);

    switch (event.event) {
      case "billing.paid":
        await handleBillingPaid(event);
        break;

      case "withdraw.done":
        console.log("✅ Saque concluído:", event.data.transaction);
        break;

      case "withdraw.failed":
        console.log("❌ Saque falhou:", event.data.transaction);
        break;

      default:
        console.log(`⚠️ Evento não tratado: ${event.event}`);
    }

    // 7) Marcar evento como processado
    processedEvents.add(event.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Processa o evento de pagamento confirmado
 */
async function handleBillingPaid(event: WebhookEvent) {
  try {
    const amount = event.data.payment?.amount || event.data.pixQrCode?.amount;

    if (!amount) {
      console.error("❌ Valor do pagamento não encontrado");
      return;
    }

    // Buscar o customerId no payload
    const customerId = event.data.billing?.customer?.id;

    if (!customerId) {
      console.error("❌ Customer ID não encontrado no evento");
      console.log("Evento completo:", JSON.stringify(event, null, 2));
      return;
    }

    // Valor em centavos - R$ 19,99 = 1999 centavos = 10 créditos
    const PRICE_PER_PACKAGE = 1999; // R$ 19,99
    const CREDITS_PER_PACKAGE = 10;

    const user = await prisma.user.findFirst({
      where: { abacatePayCustomerId: customerId },
    });

    if (!user) {
      console.error(`❌ Usuário não encontrado com abacatePayCustomerId: ${customerId}`);
      return;
    }

    // Adicionar 10 créditos ao usuário
    await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: {
          increment: CREDITS_PER_PACKAGE,
        },
      },
    });
  } catch (error) {
    console.error("❌ Erro ao processar billing.paid:", error);
    throw error;
  }
}
