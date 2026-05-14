import { instance } from "./axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Get all delivery addresses
export const handleGetBuyerAddresses = async () => {
  const { data } = await instance.get(`/profile/buyer/delivery-addresses`);
  return data;
};

// Create a new delivery address
export const handleCreateBuyerAddress = async (addressData) => {
  const { data } = await instance.post(`/profile/buyer/delivery-addresses`, {
    address: addressData.address,
    postalCode: addressData.postalCode,
    cityName: addressData.cityName,
    countryCode: addressData.countryCode,
    countryName: addressData.countryName,
  });
  return data;
};

// Update a delivery address
export const handleUpdateBuyerAddress = async (addressId, addressData) => {
  const { data } = await instance.put(
    `/profile/buyer/delivery-addresses/${addressId}`,
    {
      address: addressData.address,
      postalCode: addressData.postalCode,
      cityName: addressData.cityName,
      countryCode: addressData.countryCode,
      countryName: addressData.countryName,
    }
  );
  return data;
};

// Delete a delivery address
export const handleDeleteBuyerAddress = async (addressId) => {
  const { data } = await instance.delete(
    `/profile/buyer/delivery-addresses/${addressId}`
  );
  return data;
};

// Get shipping fee
export const handleGetShippingFee = async (payload) => {
  const { data } = await instance.post(
    `/buyer/dhl-shipping/get-shipping-fee`,
    payload
  );
  return data;
};

// React Query hook for fetching addresses
export function useBuyerAddresses() {
  return useQuery({
    queryKey: ["buyer-addresses"],
    queryFn: handleGetBuyerAddresses,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
}

// React Query hook for creating address
export function useCreateBuyerAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleCreateBuyerAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buyer-addresses"] });
    },
  });
}

// React Query hook for updating address
export function useUpdateBuyerAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ addressId, addressData }) =>
      handleUpdateBuyerAddress(addressId, addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buyer-addresses"] });
    },
  });
}

// React Query hook for deleting address
export function useDeleteBuyerAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleDeleteBuyerAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buyer-addresses"] });
    },
  });
}

export function useGetShippingFee() {
  return useMutation({
    mutationFn: handleGetShippingFee,
  });
}

// Create payment intent
export const handleCreatePaymentIntent = async (payload) => {
  const { data } = await instance.post(
    `/buyer/payment/create-payment-intent`,
    payload
  );
  return data;
};

// React Query hook for creating payment intent
export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: handleCreatePaymentIntent,
  });
}

export const handleGetPaymentStatus = async (paymentIntentId) => {
  const { data } = await instance.get(
    `/buyer/payment/status/${paymentIntentId}`
  );
  return data;
};

export function usePaymentStatus(paymentIntentId, options = {}) {
  return useQuery({
    queryKey: ["payment-status", paymentIntentId],
    queryFn: () => handleGetPaymentStatus(paymentIntentId),
    enabled: !!paymentIntentId && (options.enabled ?? true),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: (query) => {
      const state = query.state.data?.state;
      return state === "processing" ? 3000 : false;
    },
    ...options,
  });
}

// Paystack checkout (Nigerian buyers)
export const handleCreatePaystackCheckout = async (payload) => {
  const { data } = await instance.post(
    `/buyer/payment/create-paystack-checkout`,
    payload
  );
  return data;
};

export function useCreatePaystackCheckout() {
  return useMutation({
    mutationFn: handleCreatePaystackCheckout,
  });
}

export const handleGetPaystackStatus = async (reference) => {
  const { data } = await instance.get(
    `/buyer/payment/paystack/status/${reference}`
  );
  return data;
};

export function usePaystackPaymentStatus(reference, options = {}) {
  return useQuery({
    queryKey: ["paystack-status", reference],
    queryFn: () => handleGetPaystackStatus(reference),
    enabled: !!reference && (options.enabled ?? true),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: (query) => {
      const state = query.state.data?.state;
      return state === "processing" ? 3000 : false;
    },
    ...options,
  });
}
