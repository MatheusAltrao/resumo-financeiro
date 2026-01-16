"use client";

import FinanceArea from "@/components/form/finance-area";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <div className="w-full min-h-screen space-y-12 ">
      <Header />
      <div className="mx-auto max-w-300 p-2">
        <FinanceArea />
      </div>
    </div>
  );
}
