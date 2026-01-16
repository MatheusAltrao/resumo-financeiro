import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CreditQuantityCard from "./credit-quantity-card";
import GoogleSigninButton from "./google-signin-button";

export default function Perfil() {
  const hasSession = true;

  return (
    <div>
      <div className="flex items-center gap-4">
        {hasSession && (
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
          </div>
        )}
        {!hasSession && (
          <div>
            <GoogleSigninButton />
          </div>
        )}
      </div>
    </div>
  );
}
