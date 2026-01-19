"use client";
import { createCustomerAction } from "@/actions/abacate-pay/create-customer-action";
import { addCpfPhoneToUserAction } from "@/actions/user/add-cpf-phone-touser-action";
import IconLoading from "@/components/loadings/icon-loading";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCustomerSchema } from "@/schema/add-cpf-phone-user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
interface CreateCustomerButtonProps {
  hasCustomerId: boolean;
}

export default function CreateCustomerButton({ hasCustomerId }: CreateCustomerButtonProps) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof createCustomerSchema>>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      cpf: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: z.infer<typeof createCustomerSchema>) => {
    startTransition(async () => {
      console.log(data);
      try {
        await addCpfPhoneToUserAction(data.cpf, data.phoneNumber);
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
    <div>
      {!hasCustomerId && (
        <form id="form-rhf-demo" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Controller
              name="cpf"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-cpf">CPF</FieldLabel>
                  <Input {...field} id="form-rhf-demo-cpf" aria-invalid={fieldState.invalid} autoComplete="off" placeholder="000.000.000-00" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-phoneNumber">Celular</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-phoneNumber"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="(67)99999-9999"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Button type="submit" disabled={hasCustomerId || isPending} className="w-full sm:w-auto" variant={"outline"}>
            <div className="flex items-center gap-2">
              {isPending && <IconLoading text="Criando..." />}
              {!isPending && !hasCustomerId && (
                <div className="flex items-center gap-2">
                  <User /> Criar cliente
                </div>
              )}
            </div>
          </Button>
        </form>
      )}

      {hasCustomerId && (
        <Button disabled className="w-full sm:w-auto" variant={"outline"}>
          <div className="flex items-center gap-2">
            <CheckCircle /> Cliente Criado
          </div>
        </Button>
      )}
    </div>
  );
}
