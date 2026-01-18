import { AnalyzeProps } from "@/types/analyze";
import Link from "next/link";

interface AnalyzeCardProps {
  analyze: AnalyzeProps;
}

export default function AnalyzeCard({ analyze }: AnalyzeCardProps) {
  return (
    <Link href={`/analyzes/${analyze.id}`}>
      <div
        key={analyze.id}
        className="col-span-3 md:col-span-1 p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition cursor-pointer"
      >
        <div>
          <h3 className="font-semibold text-lg  text-foreground">{analyze.title.split(" - ")[0]}</h3>
          <p>{analyze.description}</p>
        </div>
        <span className="text-sm text-muted-foreground">
          Criado em: {analyze.createdAt.toLocaleDateString()} às {analyze.createdAt.toLocaleTimeString()}
        </span>
      </div>
    </Link>
  );
}
