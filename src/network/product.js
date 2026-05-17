import { instance, publicInstance } from "./axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

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

export const handleRemoveProductFromSavedItems = async (productId) => {
  const { data } = await instance.delete(`/buyer/saved-items/${productId}`);
  return data;
};

export function useProductsQuery(category, limit, key = "products", skip, queryOptions = {}) {
  return useQuery({
    // Include category in the key so each filter combination is cached independently
    queryKey: [key, category, skip],
    queryFn: () => handleFetchProducts(category, limit, skip),
    staleTime: 1000 * 60 * 30,   // 30 min — products rarely change between sessions
    gcTime: 1000 * 60 * 60,      // 1 hour garbage-collection window
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
    ...queryOptions,             // allows enabled:false for lazy/deferred loading
  });
}

export function useProductCategoriesQuery() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: handleFetchCategories,
    staleTime: 1000 * 60 * 60,   // 1 hour — category list almost never changes
    gcTime: 1000 * 60 * 120,     // 2 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export function useProductQuery(productId, queryOptions = {}) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => handleGetSingleProduct(productId),
    enabled: !!productId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 15,  // 15 min for single product pages
    ...queryOptions,
  });
}

export function useSavedItemsQuery() {
  return useQuery({
    queryKey: ["saved-items"],
    queryFn: () => handleGetSavedItems(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
}
