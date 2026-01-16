import generateFinanceResumePrompt from "@/http";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useGenerateFinanceResume() {
  const [files, setFiles] = useState<File[]>([]);

  const { data, isError, isPending, error, mutate } = useMutation({
    mutationFn: async (formData: FormData) => generateFinanceResumePrompt(formData),
    onSuccess: (data) => {
      toast.success(`Gerado com sucesso`);
      setFiles([]);
    },
    onError: (error) => {
      toast.error("Erro ao enviar os arquivos. Tente novamente.");
      console.error("Erro no envio:", error);
    },
  });

  return {
    files,
    setFiles,
    data,
    isError,
    isPending,
    error,
    mutate,
  };
}
