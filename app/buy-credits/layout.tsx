import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface BuyCreditsLayoutProps {
  children: React.ReactNode;
}

export default async function BuyCreditsLayout({ children }: BuyCreditsLayoutProps) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }
  return <div>{children}</div>;
}
