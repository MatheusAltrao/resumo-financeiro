"use client";
import useGenerateFinanceResume from "@/hooks/use-generate-finance-resume";
import toast from "react-hot-toast";
import GenerateResumeLoading from "../loadings/generate-resume-loading";
import IconLoading from "../loadings/icon-loading";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import DropzoneUI from "../ui/dropzone-ui";
import { Label } from "../ui/label";
import FormDescription from "./form-descriptrion";

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

  const formatedData = data?.result;

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
            {!isPending && (
              <div className="space-y-2">
                <Label>Documentos</Label>
                <DropzoneUI files={files} setFiles={setFiles} />
              </div>
            )}
            {isPending && <GenerateResumeLoading loading={isPending} />}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setFiles([])} disabled={files.length === 0 || isPending}>
                Limpar Tudo
              </Button>
              <Button type="submit" disabled={files.length === 0 || isPending}>
                {isPending ? <IconLoading text="Enviando..." /> : `Enviar ${files.length} arquivo(s)`}
              </Button>
            </div>

            {isError && <div className="text-sm text-red-500 text-center">Ocorreu um erro ao enviar os arquivos. Tente novamente.</div>}
          </form>
        </CardContent>
      </Card>

      {formatedData}
    </div>
  );
}
