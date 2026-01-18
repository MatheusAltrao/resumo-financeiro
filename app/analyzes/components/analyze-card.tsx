import { Button } from "@/components/ui/button";
import { AnalyzeProps } from "@/types/analyze";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";

interface AnalyzeCardProps {
  analyze: AnalyzeProps;
}

export default function AnalyzeCard({ analyze }: AnalyzeCardProps) {
  return (
    <div key={analyze.id} className=" p-4 border border-border rounded-lg cursor-pointer space-y-4">
      <div>
        <div>
          <h3 className="font-semibold text-lg  text-foreground">{analyze.title.split(" - ")[0]}</h3>
          <p>{analyze.description}</p>
        </div>
        <span className="text-sm text-muted-foreground">
          Criado em: {analyze.createdAt.toLocaleDateString()} às {analyze.createdAt.toLocaleTimeString()}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`/analyzes/${analyze.id}`}>
          <Button variant={"outline"} className="w-full">
            <Eye /> Ver Análise
          </Button>
        </Link>
        <Button variant={"destructive"}>
          <Trash /> Apagar
        </Button>
      </div>
    </div>
  );
}
