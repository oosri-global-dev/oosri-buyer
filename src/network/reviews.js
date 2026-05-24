import { instance } from "./axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const getAllReviews = async (id, page = 1) => {
  const { data } = await instance.get(`buyer/review/product/${id}`, {
    params: { page, limit: 5 },
  });
  return data;
};

export const getMyReviews = async (page = 1, limit = 10) => {
  const { data } = await instance.get("buyer/review/user-reviews", {
    params: { page, limit },
  });
  return data;
};

export const createReview = async (payload) => {
  const { data } = await instance.post("buyer/review", payload);
  return data;
};

export const updateReview = async ({ id, ...payload }) => {
  const { data } = await instance.put(`buyer/review/${id}`, payload);
  return data;
};

export const deleteReview = async (id) => {
  const { data } = await instance.delete(`buyer/review/${id}`);
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

export function useMyReviewsQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["my-reviews", page],
    queryFn: () => getMyReviews(page, limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
}

export function useUpdateReview(productId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      if (productId) queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });
}

export function useDeleteReview(productId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
      if (productId) queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });
}
