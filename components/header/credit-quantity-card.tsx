"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCredits } from "@/hooks/use-credits";
import { Loader2, Sparkles } from "lucide-react";

export default function CreditQuantityCard() {
  const { data: credits, isLoading, error } = useCredits();

  if (error) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 border border-destructive/40">
        <Sparkles className="h-4 w-4 text-destructive" />
        <span className="text-sm font-medium text-destructive">Erro ao carregar</span>
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 border border-border/40">
          {isLoading ? <Loader2 className="h-4 w-4 text-primary animate-spin" /> : <Sparkles className="h-4 w-4 text-primary" />}
          <span className="text-sm font-medium text-muted-foreground">Créditos:</span>
          <span className="text-sm font-bold text-primary">{isLoading ? "..." : credits}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Cada vez que você realiza uma análise, 1 crédito será consumido</p>
        <p className="text-xs text-muted-foreground mt-1">Atualização automática a cada 3 segundos</p>
      </TooltipContent>
    </Tooltip>
  );
}
