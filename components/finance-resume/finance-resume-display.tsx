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
    <div className="space-y-8 ">
      {data.generalSummary && <SummaryCard data={data.generalSummary} />}

      {data.incomes && data.incomes.length > 0 && <IncomeTable data={data.incomes} />}

      {data.expenseDistribution && data.expenseDistribution.length > 0 && <ExpensesDistributionChart data={data.expenseDistribution} />}

      {data.topPixExpenses && data.topPixExpenses.length > 0 && <TopPixExpensesTable data={data.topPixExpenses} />}

      {data.categoryBreakdown && data.categoryBreakdown.length > 0 && <CategorySummaryTable data={data.categoryBreakdown} />}

      <AnalysisAdvice
        patternAnalysis={data.patternAnalysis}
        analystAdvice={data.analystAdvice}
        conclusion={data.conclusion}
        finalBalance={data.generalSummary.finalBalance}
        commitmentPercentage={data.generalSummary.commitmentPercentage}
      />
    </div>
  );
}
