import { getAllAnalyzesAction } from "@/actions/analyzes/get-all-analyzes-action";
import AnalyzeCard from "./components/analyze-card";

export default async function AnalyzesPage() {
  const analyzes = await getAllAnalyzesAction();
  const hasNoAnalyzes = analyzes.length === 0;

  console.log(analyzes);
  return (
    <div className="mx-auto max-w-300 p-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {analyzes.map((analyze) => (
          <AnalyzeCard key={analyze.id} analyze={analyze} />
        ))}

        {hasNoAnalyzes && (
          <div className="col-span-3 p-6 text-center border border-border rounded-lg bg-card">
            <p className="text-sm text-muted-foreground">Nenhuma análise encontrada. Faça sua primeira análise!</p>
          </div>
        )}
      </div>
    </div>
  );
}
