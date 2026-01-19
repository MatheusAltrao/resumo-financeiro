import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";

// Public HMAC key do AbacatePay
const ABACATEPAY_PUBLIC_KEY =
  "t9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9";

// Validação do schema do evento com Zod
const webhookEventSchema = z.object({
  id: z.string().min(1, "Event ID é obrigatório"),
  event: z.enum(["billing.paid", "withdraw.done", "withdraw.failed"]),
  devMode: z.boolean(),
  data: z.object({
    payment: z
      .object({
        amount: z.number().positive(),
        fee: z.number(),
        method: z.string(),
      })
      .optional(),
    pixQrCode: z
      .object({
        amount: z.number().positive(),
        id: z.string(),
        kind: z.string(),
        status: z.string(),
        customerId: z.string().optional(),
      })
      .optional(),
    billing: z
      .object({
        id: z.string(),
        amount: z.number().positive(),
        customer: z.object({
          id: z.string().min(1, "Customer ID é obrigatório"),
          metadata: z.object({
            name: z.string(),
            email: z.string().email(),
            cellphone: z.string(),
            taxId: z.string(),
            zipCode: z.string(),
            country: z.string(),
          }),
        }),
        frequency: z.string(),
        kind: z.array(z.string()),
        status: z.string(),
        products: z.array(
          z.object({
            id: z.string(),
            externalId: z.string(),
            quantity: z.number(),
          }),
        ),
        paidAmount: z.number(),
      })
      .optional(),
    transaction: z
      .object({
        id: z.string(),
        status: z.string(),
        kind: z.string(),
        amount: z.number(),
        externalId: z.string().optional(),
      })
      .optional(),
  }),
});

type WebhookEvent = z.infer<typeof webhookEventSchema>;

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

/**
 * Verifica se o evento já foi processado no banco de dados
 */
async function isEventAlreadyProcessed(eventId: string): Promise<boolean> {
  const existingEvent = await prisma.purchaseEvent.findUnique({
    where: { eventId },
  });
  return existingEvent !== null;
}

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
    let event: WebhookEvent;
    try {
      const parsedData = JSON.parse(rawBody);
      const validation = webhookEventSchema.safeParse(parsedData);

      if (!validation.success) {
        console.error("❌ Validação do evento falhou:", validation.error.issues);
        return NextResponse.json({ error: "Invalid event structure", details: validation.error.issues }, { status: 400 });
      }

      event = validation.data;
    } catch (error) {
      console.error("❌ Erro ao fazer parse do evento:", error);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // 5) Verificar se o evento já foi processado (idempotência com banco de dados)
    if (await isEventAlreadyProcessed(event.id)) {
      console.log(`⚠️ Evento ${event.id} já foi processado`);
      return NextResponse.json({ received: true, message: "Event already processed" });
    }

    // 6) Processar o evento
    console.log(`📦 Evento recebido: ${event.event} (ID: ${event.id})`);
    console.log(`📄 Dados do evento:`, JSON.stringify(event, null, 2));

    switch (event.event) {
      case "billing.paid":
        await handleBillingPaid(event, rawBody);
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

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Processa o evento de pagamento confirmado
 */
async function handleBillingPaid(event: WebhookEvent, rawEventData: string) {
  const customerId = event.data.billing?.customer?.id;
  const billingAmount = event.data.billing?.amount;
  const paymentAmount = event.data.payment?.amount || event.data.pixQrCode?.amount;
  const paymentMethod = event.data.payment?.method || "pix";

  console.log(
    `🔍 Processando billing.paid - Customer: ${customerId}, Billing Amount: ${billingAmount}, Payment Amount: ${paymentAmount}, Method: ${paymentMethod}`,
  );

  try {
    // Validações básicas
    if (!customerId) {
      console.error("❌ Customer ID não encontrado no evento");
      await savePurchaseEvent(event, rawEventData, "failed", null, 0);
      return;
    }

    // Validar valores
    const EXPECTED_AMOUNT = 1999; // R$ 19,99 em centavos
    const CREDITS_TO_ADD = 10;

    if (!billingAmount || billingAmount !== EXPECTED_AMOUNT) {
      console.error(`❌ Valor do billing inválido. Esperado: ${EXPECTED_AMOUNT}, Recebido: ${billingAmount}`);
      await savePurchaseEvent(event, rawEventData, "failed", null, 0);
      return;
    }

    if (!paymentAmount || paymentAmount !== EXPECTED_AMOUNT) {
      console.error(`❌ Valor do pagamento inválido. Esperado: ${EXPECTED_AMOUNT}, Recebido: ${paymentAmount}`);
      await savePurchaseEvent(event, rawEventData, "failed", null, 0);
      return;
    }

    // Validar se billing.amount e payment.amount são iguais
    if (billingAmount !== paymentAmount) {
      console.error(`❌ Valores inconsistentes - Billing: ${billingAmount}, Payment: ${paymentAmount}`);
      await savePurchaseEvent(event, rawEventData, "failed", null, 0);
      return;
    }

    console.log(`✅ Valor validado: R$ ${(EXPECTED_AMOUNT / 100).toFixed(2)} → ${CREDITS_TO_ADD} créditos`);

    const creditsToAdd = CREDITS_TO_ADD;

    // Buscar usuário
    const user = await prisma.user.findFirst({
      where: { abacatePayCustomerId: customerId },
      select: { id: true, credits: true, email: true },
    });

    console.log(`👤 Busca de usuário - customerId: ${customerId}, encontrado: ${!!user}`);

    if (!user) {
      console.error(`❌ Usuário não encontrado com abacatePayCustomerId: ${customerId}`);
      await savePurchaseEvent(event, rawEventData, "failed", null, creditsToAdd);
      return;
    }

    console.log(`💾 Iniciando transação para adicionar ${creditsToAdd} créditos ao usuário ${user.email}`);

    // Usar transação para garantir atomicidade
    await prisma.$transaction(async (tx) => {
      // Adicionar créditos ao usuário
      await tx.user.update({
        where: { id: user.id },
        data: {
          credits: {
            increment: creditsToAdd,
          },
        },
      });

      // Salvar evento de compra
      const purchaseEvent = await tx.purchaseEvent.create({
        data: {
          eventId: event.id,
          userId: user.id,
          customerId,
          amount: billingAmount,
          creditsAdded: creditsToAdd,
          paymentMethod,
          status: "completed",
          billingId: event.data.billing?.id,
          transactionId: event.data.transaction?.id,
          rawEventData,
        },
      });

      console.log(`💾 PurchaseEvent criado com sucesso - ID: ${purchaseEvent.id}`);
    });

    console.log(`✅ ${creditsToAdd} créditos adicionados ao usuário ${user.email} (ID: ${user.id})`);
  } catch (error) {
    console.error("❌ Erro ao processar billing.paid:", error);
    // Salvar evento como failed
    await savePurchaseEvent(event, rawEventData, "failed", null, 0);
    throw error;
  }
}

/**
 * Salva o evento de compra no banco de dados
 */
async function savePurchaseEvent(event: WebhookEvent, rawEventData: string, status: string, userId: string | null, creditsAdded: number) {
  try {
    await prisma.purchaseEvent.create({
      data: {
        eventId: event.id,
        userId,
        customerId: event.data.billing?.customer?.id || "unknown",
        amount: event.data.payment?.amount || event.data.pixQrCode?.amount || 0,
        creditsAdded,
        paymentMethod: event.data.payment?.method || "unknown",
        status,
        billingId: event.data.billing?.id,
        transactionId: event.data.transaction?.id,
        rawEventData,
      },
    });
  } catch (error) {
    console.error("❌ Erro ao salvar evento de compra:", error);
  }
}
