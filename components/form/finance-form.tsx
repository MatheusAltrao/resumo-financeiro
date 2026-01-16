"use client";
import useGenerateFinanceResume from "@/hooks/use-generate-finance-resume";
import toast from "react-hot-toast";
import LoadingIcon from "../loadings/loading-icon";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import DropzoneUI from "../ui/dropzone-ui";
import { Label } from "../ui/label";

export default function FinanceForm() {
  const { files, setFiles, data, isError, isPending, error, mutate } = useGenerateFinanceResume();

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

  console.log("Response data:", data);
  console.log("Error data:", error);

  return (
    <div className="w-full pb-20">
      <Card>
        <CardHeader>
          <CardTitle>Envio de Documentos Financeiros</CardTitle>
          <CardDescription>
            <div>
              <p className="mb-2">Siga os passos abaixo para enviar seus documentos:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Entre no site ou aplicativo do seu banco</li>
                <li>Procure pela opção "Exportar Extrato" ou "Relatório de Movimentações"</li>
                <li>Faça o download do arquivo em formato CSV ou PDF</li>
                <li>Arraste o arquivo aqui ou clique para fazer upload</li>
                <li>Receba uma análise completa dos seus dados financeiros</li>
                <li className="text-red-500">Você só pode enviar apenas 3 arquivos por vez</li>
                <li>Aguarde a conclusão do processamento dos seus documentos, pode demorar até alguns minutos</li>
              </ol>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Documentos</Label>
              <DropzoneUI files={files} setFiles={setFiles} />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setFiles([])} disabled={files.length === 0 || isPending}>
                Limpar Tudo
              </Button>
              <Button type="submit" disabled={files.length === 0 || isPending}>
                {isPending ? <LoadingIcon text="Enviando..." /> : `Enviar ${files.length} arquivo(s)`}
              </Button>
            </div>

            {isError && <div className="text-sm text-red-500 text-center">Ocorreu um erro ao enviar os arquivos. Tente novamente.</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
