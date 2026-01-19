"use client";

import { useCredits } from "@/hooks/use-credits";
import IconLoading from "../loadings/icon-loading";

interface FinanceAreaWrapperProps {
  children: React.ReactNode;
}

export default function FinanceAreaWrapper({ children }: FinanceAreaWrapperProps) {
  const { data: isLoading } = useCredits();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <IconLoading />
      </div>
    );
  }

  return <>{children}</>;
}
