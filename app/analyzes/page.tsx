import { getAllAnalyzesAction } from "@/actions/analyzes/get-all-analyzes-action";

export default async function AnalyzesPage() {
  const analyzes = await getAllAnalyzesAction();

  const hasNoAnalyzes = analyzes.length === 0;
  return (
    <div className="mx-auto max-w-300 p-2">
      <div className="grid grid-cols-3 gap-4">
        {analyzes.map((analyze) => (
          <div
            key={analyze.id}
            className="col-span-3 md:col-span-1 p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition cursor-pointer"
          >
            <h3 className="font-semibold text-lg mb-2 text-foreground">Análise #{analyze.id.slice(0, 8)}</h3>
            <p className="text-sm text-muted-foreground">
              Criado em: {analyze.createdAt.toLocaleDateString()} às {analyze.createdAt.toLocaleTimeString()}
            </p>
          </div>
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
