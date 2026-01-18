import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface AnalyzeLayoutProps {
  children: React.ReactNode;
}

export default async function AnalyzeLayout({ children }: AnalyzeLayoutProps) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }
  return <div>{children}</div>;
}
