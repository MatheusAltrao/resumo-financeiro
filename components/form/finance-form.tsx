"use client";
import useGenerateFinanceResume from "@/hooks/use-generate-finance-resume";
import { FinanceResume } from "@/types/finance-resume";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FinanceResumeDisplay from "../finance-resume/finance-resume-display";
import GenerateResumeLoading from "../loadings/generate-resume-loading";
import IconLoading from "../loadings/icon-loading";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import DropzoneUI from "../ui/dropzone-ui";
import { Label } from "../ui/label";
import FormDescription from "./form-descriptrion";

export default function FinanceForm() {
  const { files, setFiles, data, isError, isPending, error, mutate } = useGenerateFinanceResume();
  const [financeData, setFinanceData] = useState<FinanceResume | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Por favor, adicione pelo menos um arquivo antes de enviar.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    mutate(formData);
  };

  // Parse da resposta JSON usando useEffect
  useEffect(() => {
    if (data?.result) {
      try {
        // Remove markdown code blocks if present
        let cleanedResult = data.result.trim();

        // Log para debug
        console.log("Resposta original (tamanho total):", cleanedResult.length, "chars");
        console.log("Resposta original (primeiros 500 chars):", cleanedResult.substring(0, 500));
        console.log("Resposta original (últimos 200 chars):", cleanedResult.substring(cleanedResult.length - 200));

        if (cleanedResult.startsWith("```json")) {
          cleanedResult = cleanedResult.replace(/^```json\s*/, "").replace(/```\s*$/, "");
        } else if (cleanedResult.startsWith("```")) {
          cleanedResult = cleanedResult.replace(/^```\s*/, "").replace(/```\s*$/, "");
        }

        // Fix common JSON issues
        // Remove trailing commas before } or ]
        cleanedResult = cleanedResult.replace(/,(\s*[}\]])/g, "$1");

        // Fix incomplete decimal numbers (e.g., "123." -> "123.0")
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
    <div className="w-full pb-20">
      <Card>
        <CardHeader>
          <CardTitle>Envio de Documentos Financeiros</CardTitle>
          <CardDescription>
            <FormDescription />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isPending && !financeData && (
              <div className="space-y-2">
                <Label>Documentos</Label>
                <DropzoneUI files={files} setFiles={setFiles} />
              </div>
            )}
            {isPending && <GenerateResumeLoading loading={isPending} />}

            {!financeData && (
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setFiles([])} disabled={files.length === 0 || isPending}>
                  Limpar Tudo
                </Button>
                <Button type="submit" disabled={files.length === 0 || isPending}>
                  {isPending ? <IconLoading text="Enviando..." /> : `Enviar ${files.length} arquivo(s)`}
                </Button>
              </div>
            )}

            {isError && <div className="text-sm text-red-500 text-center">Ocorreu um erro ao enviar os arquivos. Tente novamente.</div>}
          </form>
        </CardContent>
      </Card>

      {/* Exibe o relatório financeiro */}
      {financeData && <FinanceResumeDisplay data={financeData} />}

      {/* Botão para nova análise */}
      {financeData && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => {
              setFiles([]);
              mutate(new FormData()); // Reset mutation
            }}
            variant="outline"
          >
            Nova Análise
          </Button>
        </div>
      )}
    </div>
  );
}
