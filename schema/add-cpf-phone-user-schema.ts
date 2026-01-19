import z from "zod";

export const createCustomerSchema = z.object({
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
