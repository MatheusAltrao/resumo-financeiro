import { Sparkles } from "lucide-react";

export default function CreditQuantityCard() {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 border border-border/40">
      <Sparkles className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-muted-foreground">Créditos:</span>
      <span className="text-sm font-bold text-primary">150</span>
    </div>
  );
}
