"use server";

import { prisma } from "@/lib/prisma";
import { CustomerResponseProps } from "@/types/abacate-pay";
import { getUserAction } from "../user/get-user-action";

export async function createCustomerAction() {
  try {
    const user = await getUserAction();
    const token = process.env.ABACATE_PAY_TOKEN;

    console.log("Criando cliente no Abacate Pay:", user);

    const findUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { abacatePayCustomerId: true },
    });

    if (!findUser) {
      throw new Error("Usuário não encontrado");
    }

    const abacatePayCustomerId = findUser.abacatePayCustomerId;

    if (abacatePayCustomerId) {
      console.log("Cliente já existe no Abacate Pay:", abacatePayCustomerId);
      return;
    }

    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        cellphone: user.phoneNumber,
        email: user.email,
        taxId: user.cpf,
      }),
    };

    const response = await fetch("https://api.abacatepay.com/v1/customer/create", options);
    const data: CustomerResponseProps = await response.json();

    console.log("Status da resposta:", response.status);
    console.log("Resposta completa do Abacate Pay:", JSON.stringify(data, null, 2));
    console.log("Dados enviados vs recebidos:");
    console.log("Enviado - Name:", user.name, "Email:", user.email);
    console.log("Recebido - Name:", data.data.metadata.name, "Email:", data.data.metadata.email);

    const customerId = data.data.id;

    await prisma.user.update({
      where: { id: user.id },
      data: { abacatePayCustomerId: customerId },
    });

    console.log("Cliente criado com sucesso no Abacate Pay:", customerId);
  } catch (error) {
    console.error("Erro ao criar cliente no Abacate Pay:", error);
  }
}
