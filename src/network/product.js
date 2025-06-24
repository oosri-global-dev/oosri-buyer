import { getDataInCookie } from "@/data-helpers/auth-session";
import { instance, publicInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

let userToken;

if (typeof window !== "undefined") {
  // Perform sessionStorage action
  userToken = getDataInCookie("access_token");
}

export const handleFetchProducts = async (category = "", limit) => {
  const params = { category, limit };
  if (!category) {
    delete params.category;
  }

  if (!limit) {
    delete params.limit;
  }

  const { data } = await publicInstance.get(`/products/buyer`, { params });
  return data;
};

export const handleFetchCategories = async () => {
  const { data } = await publicInstance.get(`/categories`);
  return data;
};

export function useProductsQuery(category, limit) {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => handleFetchProducts(category, limit),
  });
}

export function useProductCategoriesQuery() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: handleFetchCategories,
  });
}
