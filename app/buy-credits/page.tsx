"use client";
import { createCustomerAction } from "@/actions/abacate-pay/create-customer-action";
import { Button } from "@/components/ui/button";

export default function BuyCreditsPage() {
  const handleBuyCredits = async () => {
    try {
      await createCustomerAction();
    } catch (error) {
      console.error("Erro ao criar cliente no Abacate Pay:", error);
    }
  };

  return <Button onClick={handleBuyCredits}>Comprar</Button>;
}
