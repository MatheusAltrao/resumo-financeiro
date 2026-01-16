"use client";
import { FinanceResume } from "@/types/finance-resume";
import { Sparkle } from "lucide-react";
import { Button } from "../ui/button";

interface NewAnalyseButtonProps {
  setFinanceData: (v: FinanceResume | null) => void;
}

export default function NewAnalyseButton({ setFinanceData }: NewAnalyseButtonProps) {
  const handleClearFinanceData = () => {
    setFinanceData(null);
  };
  return (
    <div className="flex items-center justify-center ">
      <Button className="h-14 w-full max-w-75 " onClick={handleClearFinanceData}>
        <Sparkle /> Nova Análise
      </Button>
    </div>
  );
}
