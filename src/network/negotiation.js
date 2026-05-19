import { instance } from "./axios";

export const createNegotiation = async (payload) => {
  const { data } = await instance.post(`/community/negotiations`, payload);
  return data;
};

export const fetchBuyerNegotiations = async ({ status, page = 1 } = {}) => {
  const params = { page };
  if (status) params.status = status;
  const { data } = await instance.get(`/community/negotiations/buyer`, { params });
  return data;
};

export const acceptNegotiation = async (negotiationId) => {
  const { data } = await instance.post(`/community/negotiations/${negotiationId}/accept`);
  return data;
};

export const rejectNegotiation = async ({ negotiationId, note }) => {
  const { data } = await instance.post(`/community/negotiations/${negotiationId}/reject`, { note });
  return data;
};

export const validateCheckoutToken = async (token) => {
  const { data } = await instance.get(`/community/negotiations/checkout/${token}`);
  return data;
};
