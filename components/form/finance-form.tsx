"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import DropzoneUI from "../ui/dropzone-ui";
import { Label } from "../ui/label";

export default function FinanceForm() {
  const [files, setFiles] = useState<File[]>([]);

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar arquivos");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(`${files.length} arquivo(s) enviado(s) com sucesso!`);
      setFiles([]);
    },
    onError: (error) => {
      toast.error("Erro ao enviar os arquivos. Tente novamente.");
      console.error("Erro no envio:", error);
    },
  });

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

    uploadMutation.mutate(formData);
  };

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
              <Button type="button" variant="outline" onClick={() => setFiles([])} disabled={files.length === 0 || uploadMutation.isPending}>
                Limpar Tudo
              </Button>
              <Button type="submit" disabled={files.length === 0 || uploadMutation.isPending}>
                {uploadMutation.isPending ? "Enviando..." : `Enviar ${files.length} arquivo(s)`}
              </Button>
            </div>

            {uploadMutation.isError && (
              <div className="text-sm text-red-500 text-center">Ocorreu um erro ao enviar os arquivos. Tente novamente.</div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
