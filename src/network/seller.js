import { publicInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

export const fetchSellerStore = async (identifier) => {
  const { data } = await publicInstance.get(`/sellers/store/${identifier}`);
  return data;
};

export const fetchSellerStoreProducts = async (identifier, skip = 0, limit = 12) => {
  const { data } = await publicInstance.get(`/sellers/store/${identifier}/products`, {
    params: { skip, limit },
  });
  return data;
};

export function useSellerStoreQuery(identifier, options = {}) {
  return useQuery({
    queryKey: ["seller-store", identifier],
    queryFn: () => fetchSellerStore(identifier),
    enabled: !!identifier,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export function useSellerStoreProductsQuery(identifier, skip = 0, limit = 12, options = {}) {
  return useQuery({
    queryKey: ["seller-store-products", identifier, skip],
    queryFn: () => fetchSellerStoreProducts(identifier, skip, limit),
    enabled: !!identifier,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
}
