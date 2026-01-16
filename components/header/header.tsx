import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CreditQuantityCard from "./credit-quantity-card";

export default function Header() {
  return (
    <header className="border-b border-border/40 bg-white ">
      <div className="flex h-16 items-center justify-between w-full max-w-300 p-2 mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Resumo Financeiro AI</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <CreditQuantityCard />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className=" block lg:hidden">
                <CreditQuantityCard />
                <DropdownMenuSeparator />
              </div>

              <DropdownMenuItem>Outras Análises</DropdownMenuItem>
              <DropdownMenuItem>Comprar Créditos</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/*  <GoogleSigninButton /> */}
        </div>
      </div>
    </header>
  );
}
