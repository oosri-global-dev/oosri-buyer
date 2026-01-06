import { getDataInCookie } from "@/data-helpers/auth-session";
import { instance, publicInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

let userToken;

if (typeof window !== "undefined") {
  // Perform sessionStorage action
  userToken = getDataInCookie("access_token");
}

export const handleFetchProducts = async (category = [], limit, skip) => {
  const params = {};
  if (Array.isArray(category) && category.length > 0) {
    params["category[]"] = category;
  } else if (typeof category === "string" && category) {
    params["category[]"] = [category];
  }
  if (limit) {
    params.limit = limit;
  }

  if (skip) {
    params.skip = skip;
  }
  const { data } = await publicInstance.get(`/products/buyer`, { params });
  return data;
};

export const handleFetchCategories = async () => {
  const { data } = await publicInstance.get(`/categories`);
  return data;
};

export const handleGetSingleProduct = async (productId) => {
  const { data } = await publicInstance.get(`/products/buyer/${productId}`);
  return data;
};

export const handleAddProductToSavedItems = async (productId) => {
  const { data } = await instance.post(`/buyer/saved-items`, {
    productId: productId,
  });
  return data;
};

export const handleGetSavedItems = async (productId = null) => {
  const params = {};
  if (productId) {
    params.productId = productId;
  }
  const { data } = await instance.get(`/buyer/saved-items`, {
    params,
  });
  return data;
};

export function useProductsQuery(category, limit, key = "products", skip) {
  return useQuery({
    queryKey: [key, skip],
    queryFn: () => handleFetchProducts(category, limit, skip),
    staleTime: 1000 * 60 * 5, // 5 minutes, adjust as needed
    cacheTime: 1000 * 60 * 10, // 10 minutes, adjust as needed
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export function useProductCategoriesQuery() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: handleFetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes, adjust as needed
    cacheTime: 1000 * 60 * 10, // 10 minutes, adjust as needed
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export function useProductQuery(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => handleGetSingleProduct(productId),
    enabled: !!productId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useSavedItemsQuery() {
  return useQuery({
    queryKey: ["saved-items"],
    queryFn: () => handleGetSavedItems(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
}
