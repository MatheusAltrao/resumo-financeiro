"use client";
import { useCredits } from "@/hooks/use-credits";
import { FinanceResume } from "@/types/finance-resume";
import toast from "react-hot-toast";
import GenerateResumeLoading from "../loadings/generate-resume-loading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import DropzoneUI from "../ui/dropzone-ui";
import { Label } from "../ui/label";
import ButtonsActionForm from "./buttons-action-form";
import FormDescription from "./form-descriptrion";

interface FinanceFormProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isPending: boolean;
  isError: boolean;
  mutate: (formData: FormData) => void;
  financeData: FinanceResume | null;
}

export default function FinanceForm({ files, setFiles, isPending, isError, mutate, financeData }: FinanceFormProps) {
  const { data: credits } = useCredits();
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

  return (
    <div className="space-y-8">
      {!financeData && (
        <Card>
          <CardHeader>
            <CardTitle>Envio de Documentos Financeiros</CardTitle>
            <CardDescription>
              <FormDescription />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Documentos</Label>
                <DropzoneUI files={files} setFiles={setFiles} isPending={isPending} />
              </div>

              {!financeData && <ButtonsActionForm files={files} isPending={isPending} credits={credits || 0} />}

              {isError && <div className="text-sm text-red-500 text-center">Ocorreu um erro ao enviar os arquivos. Tente novamente.</div>}
            </form>
          </CardContent>
        </Card>
      )}

      {isPending && <GenerateResumeLoading loading={isPending} />}
    </div>
  );
}
