import { getAllAnalyzesAction } from "@/actions/analyzes/get-all-analyzes-action";

export default async function AnalyzesPage() {
  const analyzes = await getAllAnalyzesAction();
  const hasNoAnalyzes = analyzes.length === 0;

  console.log(analyzes);
  return (
    <div className="mx-auto max-w-300 p-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {analyzes.map((analyze) => (
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
