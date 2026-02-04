import { instance } from "./axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Get user orders with pagination
export const handleGetUserOrders = async ({ skip = 0, limit = 10 }) => {
  const { data } = await instance.get(`/buyer/order/user?skip=${skip}&limit=${limit}`);
  return data;
};

// Get single order by ID
export const handleGetOrderById = async (orderId) => {
  const { data } = await instance.get(`/buyer/order/user/${orderId}`);
  return data;
};

// React Query hook for fetching user orders
export function useGetUserOrders({ skip = 0, limit = 10 } = {}) {
  return useQuery({
    queryKey: ["user-orders", skip, limit],
    queryFn: () => handleGetUserOrders({ skip, limit }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
}

// React Query hook for fetching single order
export function useGetOrderById(orderId) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => handleGetOrderById(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
}
