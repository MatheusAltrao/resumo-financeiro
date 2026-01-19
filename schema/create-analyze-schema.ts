import { z } from "zod";

// Schema para validar a estrutura do resumo financeiro
export const financeResumeSchema = z.object({
  generalSummary: z.object({
    totalIncome: z.number(),
    totalExpenses: z.number(),
    finalBalance: z.number(),
    commitmentPercentage: z.number(),
    classification: z.enum(["Positivo", "Neutro", "Negativo"]),
  }),
  incomeByCategory: z
    .array(
      z.object({
        category: z.string(),
        amount: z.number(),
        percentage: z.number(),
      }),
    )
    .optional(),
  expensesByCategory: z
    .array(
      z.object({
        category: z.string(),
        amount: z.number(),
        percentage: z.number(),
      }),
    )
    .optional(),
});

// Schema para validar os parâmetros da action
export const createAnalyzeSchema = z.object({
  resumeGenerated: z.string().min(1, "O resumo é obrigatório"),
  fileName: z.string().optional(),
  securityToken: z.string().min(1, "Token de segurança é obrigatório"),
});

// Token de segurança - deve ser enviado em toda requisição
export const SECURITY_TOKEN = process.env.FINANCE_SECURITY_TOKEN || "DEFAULT_SECURE_TOKEN_CHANGE_ME";

export type CreateAnalyzeInput = z.infer<typeof createAnalyzeSchema>;
