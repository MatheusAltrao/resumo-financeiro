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
  data: string;
  origem: string;
  descricao: string;
  valor: number;
}

export interface ExpenseDistribution {
  categoria: string;
  valor: number;
  percentual: number;
}

export interface CategorySummary {
  categoria: string;
  expenses: ExpenseItem[];
  total: number;
}

export interface ExpenseItem {
  descricao: string;
  valor: number;
  data?: string;
}

export interface TopPixExpense {
  recebedor: string;
  valor: number;
  quantidade: number;
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
