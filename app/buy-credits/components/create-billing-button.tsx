"use client";
import { createBillingAction } from "@/actions/abacate-pay/create-billing-action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface CreateBillingButtonProps {
  hasCustomerId: boolean;
}

export default function CreateBillingButton({ hasCustomerId }: CreateBillingButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateCustomer = async () => {
    startTransition(async () => {
      try {
        const billing = await createBillingAction();
        const url = billing.data.url;
        router.push(url);
      } catch (error) {
        console.error("Erro ao criar cliente no Abacate Pay:", error);
        toast.error("Erro ao criar cliente no Abacate Pay.");
      }
    });
  };

  return (
    <Button disabled={!hasCustomerId || isPending} onClick={handleCreateCustomer}>
      {isPending ? "Criando..." : "Comprar Agora"}
    </Button>
  );
}
