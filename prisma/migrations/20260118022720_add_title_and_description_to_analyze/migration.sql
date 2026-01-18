/*
  Warnings:

  - Added the required column `description` to the `Analyze` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Analyze` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable - Adicionar colunas com valores padrão temporários
ALTER TABLE "Analyze" ADD COLUMN "description" TEXT NOT NULL DEFAULT 'Análise financeira gerada';
ALTER TABLE "Analyze" ADD COLUMN "title" TEXT NOT NULL DEFAULT 'Análise Financeira';

-- Atualizar registros existentes com valores baseados na data
UPDATE "Analyze" 
SET "title" = 'Análise Financeira - ' || TO_CHAR("createdAt", 'TMMonth YYYY'),
    "description" = 'Resumo financeiro detalhado'
WHERE "title" = 'Análise Financeira';

-- Remover valores padrão das colunas
ALTER TABLE "Analyze" ALTER COLUMN "description" DROP DEFAULT;
ALTER TABLE "Analyze" ALTER COLUMN "title" DROP DEFAULT;
