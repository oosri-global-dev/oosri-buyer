import { publicInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

export const searchProducts = async (query) => {
  const { data } = await publicInstance.get(`/products/buyer`, { params: { productName: query, limit: 10 } });
  return data;
};

export function useSearchQuery(query) {
  const trimmed = typeof query === "string" ? query.trim() : "";
  return useQuery({
    queryKey: ["search", trimmed],
    queryFn: () => searchProducts(trimmed),
    enabled: trimmed.length >= 2,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
