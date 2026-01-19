"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import z from "zod";

const addCpfPhoneToUserActionSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos.")
    .max(14, "CPF inválido.")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, "CPF deve estar no formato 000.000.000-00 ou conter apenas 11 dígitos."),
  phoneNumber: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos.")
    .max(15, "Telefone inválido.")
    .regex(/^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$|^\d{10,11}$/, "Telefone deve estar no formato (00) 90000-0000 ou conter apenas dígitos."),
});

export async function addCpfPhoneToUserAction(cpf: string, phoneNumber: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  const validation = addCpfPhoneToUserActionSchema.safeParse({ cpf, phoneNumber });

  console.log("validation", validation);

  if (!validation.success) {
    const errors = validation.error.issues.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
    throw new Error(`Dados inválidos: ${errors}`);
  }

  const { cpf: validatedCpf, phoneNumber: validatedPhone } = validation.data;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        cpf: validatedCpf,
        phoneNumber: validatedPhone,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar CPF e telefone do usuário:", error);
    throw new Error("Erro ao atualizar CPF e telefone do usuário.");
  }
}
