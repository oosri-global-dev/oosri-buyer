import { instance } from "./axios";
import { useQuery } from "@tanstack/react-query";

const normalizeOrdersResponse = (data) => {
  const body = data?.body || {};
  return {
    status: data?.status,
    message: data?.message,
    orders: Array.isArray(body.orders)
      ? body.orders
      : Array.isArray(data?.orders)
      ? data.orders
      : [],
    pagination: body.pagination || data?.pagination || {},
  };
};

// Get user orders with pagination
export const handleGetUserOrders = async ({ skip = 0, limit = 10 }) => {
  const { data } = await instance.get(`/buyer/order/user?skip=${skip}&limit=${limit}`);
  return normalizeOrdersResponse(data);
};

// Get single order by ID
export const handleGetOrderById = async (orderId) => {
  const { data } = await instance.get(`/buyer/order/user/${orderId}`);
  return data;
};

// React Query hook for fetching user orders
export function useGetUserOrders({ buyerId, skip = 0, limit = 10, enabled = true } = {}) {
  return useQuery({
    queryKey: ["user-orders", buyerId || "anonymous", skip, limit],
    queryFn: () => handleGetUserOrders({ skip, limit }),
    enabled: enabled && !!buyerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
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
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
}
