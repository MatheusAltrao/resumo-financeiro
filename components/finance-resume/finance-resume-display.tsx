import { FinanceResume } from "@/types/finance-resume";
import AnalysisAdvice from "./analysis-advice";
import CategorySummaryTable from "./category-summary-table";
import ExpensesDistributionChart from "./expenses-distribution-chart";
import IncomeTable from "./income-table";
import SummaryCard from "./summary-card";
import TopPixExpensesTable from "./top-pix-expenses-table";

interface FinanceResumeDisplayProps {
  data: FinanceResume;
}

export default function FinanceResumeDisplay({ data }: FinanceResumeDisplayProps) {
  return (
    <div className="space-y-6 mt-8">
      {/* Resumo Geral */}
      <SummaryCard data={data.resumoGeral} />

      {/* Recebimentos */}
      {data.recebimentos && data.recebimentos.length > 0 && <IncomeTable data={data.recebimentos} />}

      {/* Distribuição de Gastos */}
      {data.distribuicaoGastos && data.distribuicaoGastos.length > 0 && <ExpensesDistributionChart data={data.distribuicaoGastos} />}

      {/* Top Gastos Pix */}
      {data.topGastosPix && data.topGastosPix.length > 0 && <TopPixExpensesTable data={data.topGastosPix} />}

      {/* Resumo por Categoria */}
      {data.resumoPorCategoria && data.resumoPorCategoria.length > 0 && <CategorySummaryTable data={data.resumoPorCategoria} />}

      {/* Análises e Conselhos */}
      <AnalysisAdvice padroes={data.analisesPadroes} conselho={data.conselhoAnalista} conclusao={data.conclusao} />
    </div>
  );
}
