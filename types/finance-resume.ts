export interface FinanceResume {
  resumoGeral: ResumoGeral;
  recebimentos: Recebimento[];
  distribuicaoGastos: DistribuicaoGasto[];
  resumoPorCategoria: ResumoPorCategoria[];
  topGastosPix: TopGastoPix[];
  analisesPadroes: string[];
  conselhoAnalista: ConselhoAnalista;
  conclusao: Conclusao;
}

export interface ResumoGeral {
  totalReceitas: number;
  totalDespesas: number;
  saldoFinal: number;
  percentualComprometido: number;
  classificacao: "Positivo" | "Neutro" | "Negativo";
}

export interface Recebimento {
  data: string;
  origem: string;
  descricao: string;
  valor: number;
}

export interface DistribuicaoGasto {
  categoria: string;
  valor: number;
  percentual: number;
}

export interface ResumoPorCategoria {
  categoria: string;
  gastos: GastoItem[];
  total: number;
}

export interface GastoItem {
  descricao: string;
  valor: number;
  data?: string;
}

export interface TopGastoPix {
  recebedor: string;
  valor: number;
  quantidade: number;
}

export interface ConselhoAnalista {
  maioresGastos: string[];
  riscosFinanceiros: string[];
  sugestoesPraticas: string[];
  proximosPassos: string[];
}

export interface Conclusao {
  situacaoAtual: string;
  principalAtencao: string;
  melhorAcao: string;
}
