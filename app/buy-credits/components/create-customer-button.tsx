"use client";

import { createCustomerAction } from "@/actions/abacate-pay/create-customer-action";
import IconLoading from "@/components/loadings/icon-loading";
import { Button } from "@/components/ui/button";
import { CheckCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface CreateCustomerButtonProps {
  hasCustomerId: boolean;
}

export default function CreateCustomerButton({ hasCustomerId }: CreateCustomerButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateCustomer = async () => {
    startTransition(async () => {
      try {
        await createCustomerAction();
        toast.success("Cliente criado com sucesso!");
        router.refresh();
      } catch (error) {
        console.error("Erro ao criar cliente no Abacate Pay:", error);
        toast.error("Erro ao criar cliente no Abacate Pay.");
      }
    });
  };

  return (
    <Button disabled={hasCustomerId || isPending} onClick={handleCreateCustomer} className="w-full sm:w-auto" variant={"outline"}>
      <div className="flex items-center gap-2">
        {isPending && <IconLoading text="Criando..." />}
        {!isPending && !hasCustomerId && (
          <div className="flex items-center gap-2">
            <User /> Criar cliente
          </div>
        )}

        {hasCustomerId && (
          <div className="flex items-center gap-2">
            <CheckCircle /> Cliente Criado
          </div>
        )}
      </div>
    </Button>
  );
}
