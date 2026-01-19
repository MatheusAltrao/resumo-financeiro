import { signOutAction } from "@/actions/auth/sign-out-action";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import CreditQuantityCard from "./credit-quantity-card";
import GoogleSigninButton from "./google-signin-button";

export default async function Perfil() {
  const session = await auth();
  const hasSession = session && session.user;

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
                  <AvatarImage src={hasSession.image || ""} />
                  <AvatarFallback>{hasSession.name?.[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className=" block lg:hidden">
                  <CreditQuantityCard />
                  <DropdownMenuSeparator />
                </div>

                <DropdownMenuItem>
                  <Link href="/analyzes">Ver todas as análizes</Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/buy-credits">Comprar Créditos</Link>
                </DropdownMenuItem>
                <form action={signOutAction}>
                  <Button variant={"destructive"} className="w-full h-8 mt-1 justify-start" type="submit">
                    Sair
                  </Button>
                </form>
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
