import { DollarSign } from "lucide-react";
import Perfil from "./perfil";

export default function Header() {
  return (
    <header className="border-b border-border/40 bg-white ">
      <div className="flex h-16 items-center justify-between w-full max-w-300 p-2 mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="lg:text-lg font-medium  text-foreground">Resumo Financeiro AI</span>
        </div>

        <Perfil />
      </div>
    </header>
  );
}
