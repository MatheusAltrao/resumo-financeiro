export interface FinanceResume {
  generalSummary: GeneralSummary;
  incomes: Income[];
  expenseDistribution: ExpenseDistribution[];
  categoryBreakdown: CategorySummary[];
  topPixExpenses: TopPixExpense[];
  patternAnalysis: string[];
  analystAdvice: AnalystAdvice;
  conclusion: Conclusion;
}

export interface GeneralSummary {
  totalIncome: number;
  totalExpenses: number;
  finalBalance: number;
  commitmentPercentage: number;
  classification: "Positivo" | "Neutro" | "Negativo";
}

export interface Income {
  date: string;
  source: string;
  description: string;
  value: number;
}

export interface ExpenseDistribution {
  category: string;
  value: number;
  percentage: number;
}

export interface CategorySummary {
  category: string;
  expenses: ExpenseItem[];
  total: number;
}

export interface ExpenseItem {
  description: string;
  value: number;
  date?: string;
}

export interface TopPixExpense {
  receiver: string;
  value: number;
  quantity: number;
}

export interface AnalystAdvice {
  largestExpenses: string[];
  financialRisks: string[];
  practicalSuggestions: string[];
  nextSteps: string[];
}

export interface Conclusion {
  currentSituation: string;
  mainConcern: string;
  bestAction: string;
}
