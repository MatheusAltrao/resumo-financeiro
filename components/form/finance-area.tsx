"use client";
import { useCredits } from "@/hooks/use-credits";
import useGenerateFinanceResume from "@/hooks/use-generate-finance-resume";
import { FinanceResume } from "@/types/finance-resume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FinanceResumeDisplay from "../finance-resume/finance-resume-display";
import FinanceForm from "./finance-form";
import NewAnalyseButton from "./new-analyse-button";

export default function FinanceArea() {
  const { data: credits } = useCredits();
  const { files, setFiles, data, isError, isPending, mutate } = useGenerateFinanceResume();
  const [financeData, setFinanceData] = useState<FinanceResume | null>(null);

  useEffect(() => {
    if (data?.result) {
      try {
        let cleanedResult = data.result.trim();

        console.log("Resposta original (tamanho total):", cleanedResult.length, "chars");
        console.log("Resposta original (primeiros 500 chars):", cleanedResult.substring(0, 500));
        console.log("Resposta original (últimos 200 chars):", cleanedResult.substring(cleanedResult.length - 200));

        if (cleanedResult.startsWith("```json")) {
          cleanedResult = cleanedResult.replace(/^```json\s*/, "").replace(/```\s*$/, "");
        } else if (cleanedResult.startsWith("```")) {
          cleanedResult = cleanedResult.replace(/^```\s*/, "").replace(/```\s*$/, "");
        }

        cleanedResult = cleanedResult.replace(/,(\s*[}\]])/g, "$1");

        cleanedResult = cleanedResult.replace(/(\d+\.)([,\s\}\]])/g, "$1 0$2");

        console.log("JSON limpo (tamanho):", cleanedResult.length, "chars");

        const parsed = JSON.parse(cleanedResult) as FinanceResume;
        setFinanceData(parsed);
        console.log("✅ JSON parseado com sucesso!");
      } catch (error) {
        console.error("❌ Erro ao parsear JSON:", error);
        console.error("JSON completo que causou o erro:", data.result);
        toast.error("Erro ao processar resposta da IA. O JSON está incompleto ou inválido. Tente novamente.");
        setFinanceData(null);
      }
    }
  }, [data]);

  return (
    <div className="space-y-8">
      <FinanceForm files={files} financeData={financeData} isError={isError} isPending={isPending} mutate={mutate} setFiles={setFiles} />
      {financeData && <NewAnalyseButton setFinanceData={setFinanceData} />}
      {financeData && <FinanceResumeDisplay data={financeData} />}
    </div>
  );
}
