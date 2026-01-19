"use server";

import { auth } from "@/lib/auth";
import { BillingResponseProps } from "@/types/abacate-pay";
import { getCustomerIdAction } from "../user/get-customer-id-action";

export async function createBillingAction() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  const token = process.env.ABACATE_PAY_TOKEN;

  const customerId = await getCustomerIdAction();

  const customer = {
    id: customerId,
    name: session.user.name,
    email: session.user.email,
    cellphone: "",
    taxId: "",
  };

  try {
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        frequency: "ONE_TIME",
        methods: ["PIX"],
        products: [
          {
            externalId: "1",
            name: "Análise financeira inteligente",
            description:
              "Transforme seus dados financeiros em insights acionáveis com o poder da inteligência artificial. Envie seu arquivo CSV e receba um resumo completo em segundos.",
            quantity: 1,
            price: 1999,
          },
        ],
        returnUrl: "http://localhost:3000/buy-credits",
        completionUrl: "http://localhost:3000/",
        customerId: customer.id,
        customer: {
          name: customer.name,
          cellphone: customer.cellphone,
          email: customer.email,
          taxId: customer.taxId,
        },
        allowCoupons: false,
      }),
    };

    const response = await fetch("https://api.abacatepay.com/v1/billing/create", options);
    const data = await response.json();
    return data as BillingResponseProps;
  } catch (error) {
    console.error("Erro ao criar cobrança no Abacate Pay:", error);
    throw new Error("Erro ao criar cobrança no Abacate Pay");
  }
}
