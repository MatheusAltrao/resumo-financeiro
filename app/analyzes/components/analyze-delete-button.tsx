"use client";
import { deleteAnalyzeAction } from "@/actions/analyzes/delete-analyze-action";
import IconLoading from "@/components/loadings/icon-loading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface AnalyzeDeleteButtonProps {
  analyzeId: string;
}

export default function AnalyzeDeleteButton({ analyzeId }: AnalyzeDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    try {
      startTransition(async () => {
        await deleteAnalyzeAction(analyzeId);
        toast.success("Análise deletada com sucesso!");
      });
    } catch (error) {
      toast.error("Erro ao deletar análise. Tente novamente.");
    }
  }

  return (
    <Button disabled={isPending} variant={"destructive"} onClick={handleDelete}>
      {isPending && <IconLoading text="Apagando ..." />}
      {!isPending && (
        <>
          <Trash /> Deletar Análise
        </>
      )}
    </Button>
  );
}
