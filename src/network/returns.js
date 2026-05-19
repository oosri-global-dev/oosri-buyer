import { instance } from "./axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const submitReturnRequest = async (payload) => {
  const { data } = await instance.post("/buyer/returns", payload);
  return data;
};

export const getMyReturns = async ({ skip = 0, limit = 10 } = {}) => {
  const { data } = await instance.get("/buyer/returns", { params: { skip, limit } });
  return data;
};

export const getMyReturnById = async (id) => {
  const { data } = await instance.get(`/buyer/returns/${id}`);
  return data;
};

export function useMyReturns({ skip = 0, limit = 10 } = {}) {
  return useQuery({
    queryKey: ["my-returns", skip, limit],
    queryFn: () => getMyReturns({ skip, limit }),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useMyReturnById(id) {
  return useQuery({
    queryKey: ["my-return", id],
    queryFn: () => getMyReturnById(id),
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

export function useSubmitReturn(options = {}) {
  return useMutation({
    mutationFn: submitReturnRequest,
    ...options,
  });
}
