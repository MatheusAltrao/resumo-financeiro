"use client";

import FinanceForm from "@/components/form/finance-form";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <div className="w-full min-h-screen  mx-auto p-2">
      <Header />

      <main className="w-full mx-auto px-4 lg:px-8">
        <section className="flex flex-col items-center justify-center max-w-300 mx-auto py-20 space-y-20">
          <div className="text-center  ">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Powered by AI</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6 text-foreground">
              Análise Financeira <span className="text-primary">Inteligente</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground text-balance leading-relaxed">
              Transforme seus dados financeiros em insights acionáveis com o poder da inteligência artificial. Envie seu arquivo CSV e receba um
              resumo completo em segundos.
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6  w-full ">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border/40">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Análise Rápida</h3>
                <p className="text-sm text-muted-foreground">Resultados em segundos com processamento inteligente</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border/40">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">100% Seguro</h3>
                <p className="text-sm text-muted-foreground">Seus dados financeiros protegidos com criptografia</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border/40">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Insights Precisos</h3>
                <p className="text-sm text-muted-foreground">Relatórios detalhados com recomendações personalizadas</p>
              </div>
            </div>

            <FinanceForm />
          </div>
        </section>
      </main>
    </div>
  );
}
