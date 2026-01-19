import { Sparkles } from "lucide-react";
import Link from "next/link";
import IconLoading from "../loadings/icon-loading";
import { Button } from "../ui/button";

interface ButtonsActionFormProps {
  files: File[];
  isPending: boolean;
  credits: number;
}

export default function ButtonsActionForm({ files, isPending, credits }: ButtonsActionFormProps) {
  const hasNoCredits = credits <= 0;

  if (hasNoCredits) {
    return (
      <div className="flex flex-col gap-2 ">
        <Link href="/buy-credits">
          <Button className="w-full" type="submit">
            <Sparkles /> Comprar créditos para Análise
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button type="submit" disabled={files.length === 0 || isPending}>
        {isPending ? <IconLoading text="Analisando..." /> : `Enviar ${files.length} arquivo(s)`}
      </Button>
    </div>
  );
}
