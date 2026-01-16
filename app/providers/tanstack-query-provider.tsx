"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

export default function TanstackQueryProvider({ children }: TanstackQueryProviderProps) {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
