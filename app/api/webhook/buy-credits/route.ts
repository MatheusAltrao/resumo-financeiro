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
    console.log(`📦 Evento recebido: ${event.event} (ID: ${event.id}, DevMode: ${event.devMode})`);

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

    // Valor em centavos - R$ 19,99 = 1999 centavos = 10 créditos
    const PRICE_PER_PACKAGE = 1999; // R$ 19,99
    const CREDITS_PER_PACKAGE = 10;

    if (amount === PRICE_PER_PACKAGE) {
      // Aqui você precisa identificar o usuário
      // Você pode usar o externalId ou metadata para vincular ao usuário
      // Por enquanto, vou deixar um exemplo comentado

      /*
      const userId = "USER_ID_FROM_METADATA_OR_EXTERNAL_ID";
      
      await prisma.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: CREDITS_PER_PACKAGE
          }
        }
      });
      
      console.log(`✅ ${CREDITS_PER_PACKAGE} créditos adicionados ao usuário ${userId}`);
      */

      console.log(`✅ Pagamento de R$ ${amount / 100} confirmado. ${CREDITS_PER_PACKAGE} créditos devem ser adicionados.`);
      console.log("⚠️ Implemente a lógica de vincular o pagamento ao usuário correto");
    } else {
      console.warn(`⚠️ Valor inesperado recebido: R$ ${amount / 100}`);
    }
  } catch (error) {
    console.error("❌ Erro ao processar billing.paid:", error);
    throw error;
  }
}
