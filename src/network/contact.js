import { publicInstance } from "./axios";

export const contactUs = async (payload) => {
  const { data } = await publicInstance.post(`/buyer/contact-us`, payload);
  return data;
};
