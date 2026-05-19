import { instance } from "./axios";
import { useQuery } from "@tanstack/react-query";

export const getAllReviews = async (id, page = 1) => {
  const { data } = await instance.get(`buyer/review/product/${id}`, {
    params: { page, limit: 5 },
  });
  return data;
};

export function useReviewsQuery(productId, page = 1) {
  return useQuery({
    queryKey: ["reviews", productId, page],
    queryFn: () => getAllReviews(productId, page),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
