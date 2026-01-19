import { useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchCredits() {
  const response = await fetch("/api/credits");

  if (!response.ok) {
    throw new Error("Erro ao buscar créditos");
  }

  const data = await response.json();
  return data.credits as number;
}

export function useCredits() {
  return useQuery({
    queryKey: ["credits"],
    queryFn: fetchCredits,
    refetchInterval: 3000, // Atualiza a cada 3 segundos
    refetchOnWindowFocus: true, // Atualiza quando voltar para a aba
    staleTime: 2000, // Considera os dados "frescos" por 2 segundos
  });
}

export function useInvalidateCredits() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["credits"] });
  };
}
