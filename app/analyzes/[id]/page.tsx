import { getAnalyzeByIdAction } from "@/actions/analyzes/get-analyze-by-id-action";
import FinanceResumeDisplay from "@/components/finance-resume/finance-resume-display";
import { FinanceResume } from "@/types/finance-resume";

interface AnalyzesByIdProps {
  params: {
    id: string;
  };
}

export default async function AnalyzesById({ params }: AnalyzesByIdProps) {
  const { id } = await params;
  const analyzeById = await getAnalyzeByIdAction(id);

  const financeData: FinanceResume = JSON.parse(analyzeById.resumeData);

  return (
    <div className="mx-auto max-w-300 p-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{analyzeById.title}</h1>
        <p className="text-muted-foreground">{analyzeById.description}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Criado em:{" "}
          {new Date(analyzeById.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <FinanceResumeDisplay data={financeData} />
    </div>
  );
}
