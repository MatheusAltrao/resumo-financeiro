"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CustomerResponseProps } from "@/types/abacate-pay";

export async function createCustomerAction() {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("Usuário não autenticado");
    }

    const token = process.env.ABACATE_PAY_TOKEN;

    const user = {
      name: session.user.name,
      email: session.user.email,
      taxId: "",
      cellphone: "",
    };

    console.log("Criando cliente no Abacate Pay:", user);

    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    const findUser = await prisma.user.findUnique({
      where: { id: session.user.id },
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

    const response = await fetch("https://api.abacatepay.com/v1/customer/create", options);
    const data: CustomerResponseProps = await response.json();
    const customerId = data.data.id;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { abacatePayCustomerId: customerId },
    });

    console.log("Cliente criado com sucesso no Abacate Pay:", customerId);
  } catch (error) {
    console.error("Erro ao criar cliente no Abacate Pay:", error);
  }
}
