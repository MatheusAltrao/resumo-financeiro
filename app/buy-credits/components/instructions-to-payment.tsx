"use client";
import { createCustomerAction } from "@/actions/abacate-pay/create-customer-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface InstructionsToPaymentProps {
  customerId: string | null;
}

export default function InstructionsToPayment({ customerId }: InstructionsToPaymentProps) {
  const hasCustomerId = !!customerId;

  const handleCreateCustomer = async () => {
    try {
      await createCustomerAction();
    } catch (error) {
      console.error("Erro ao criar cliente no Abacate Pay:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      // Lógica de compra será implementada aqui
      console.log("Comprando créditos...");
    } catch (error) {
      console.error("Erro ao comprar créditos:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Análises Financeiras com IA</CardTitle>
        <CardDescription className="text-xl mt-4">
          Por apenas <span className="text-2xl font-bold text-primary">R$ 19,99</span>
        </CardDescription>
        <p className="text-lg mt-2">Faça 10 análises financeiras completas com inteligência artificial</p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-semibold">Seja um cliente nosso</h3>
                <p className="text-muted-foreground">Primeiro, você precisa se cadastrar como cliente em nossa plataforma.</p>
              </div>
              <Button disabled={hasCustomerId} onClick={handleCreateCustomer} className="w-full sm:w-auto" variant={"outline"}>
                {hasCustomerId ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle /> Cliente Criado
                  </div>
                ) : (
                  "Criar Conta de Cliente"
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-semibold">Comprar agora</h3>
                <p className="text-muted-foreground">Após se cadastrar, finalize sua compra e comece a usar imediatamente.</p>
              </div>
              <Button onClick={handleBuyNow} className="w-full sm:w-auto" variant="default">
                Comprar Agora - R$ 19,99
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-semibold mb-3">O que você vai receber:</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              10 análises financeiras completas
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Relatórios detalhados com IA
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Gráficos e visualizações
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              Recomendações personalizadas
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
