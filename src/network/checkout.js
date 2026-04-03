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
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
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
