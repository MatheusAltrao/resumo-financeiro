import getCreditsQuantityAction from "@/actions/credits/get-credits-quantity-action";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles } from "lucide-react";

export default async function CreditQuantityCard() {
  const credits = await getCreditsQuantityAction();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 border border-border/40">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Créditos:</span>
          <span className="text-sm font-bold text-primary">{credits}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Cada vez que você realiza uma análise, 1 crédito será consumido</p>
      </TooltipContent>
    </Tooltip>
  );
}
