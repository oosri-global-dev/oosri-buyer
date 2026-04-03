import { instance } from "./axios";

export const searchProducts = async (query, page = 1) => {
  const { data } = await instance.get(`/products/buyer/search`, {
    params: {
      q: query,
      page: page,
      limit: 5,
    },
  });
  return data;
};
