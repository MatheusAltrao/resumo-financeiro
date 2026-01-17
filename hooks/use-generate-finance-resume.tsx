import generateFinanceResumePrompt from "@/http";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useGenerateFinanceResume() {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const { data, isError, isPending, error, mutate } = useMutation({
    mutationFn: async (formData: FormData) => generateFinanceResumePrompt(formData),
    onSuccess: (data) => {
      if (data.error) {
        if (data.error.includes("crédito do usuário")) {
          return toast.error("Usuário sem créditos suficientes. Por favor, adquira mais créditos para continuar utilizando o serviço.");
        }
      }
      toast.success(`Gerado com sucesso`);
      setFiles([]);
      router.refresh();
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
