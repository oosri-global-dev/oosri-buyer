import { instance } from "./axios";

export const handleGenerateUniqueCartKey = async () => {
  const { data } = await instance.get(`/buyer/cart/generate-cart-key`);

  return data;
};

export const handleAddToCart = async (items) => {
  const { data } = await instance.post(`/buyer/cart`, items);

  return data;
};

export const handleRemoveFromCart = async (itemId, cartKey) => {
  const config = {}; // Axios config object

  if (cartKey) {
    config.params = { cartKey }; // Add params to config
  }

  const { data } = await instance.delete(`/buyer/cart/item/${itemId}`, config);

  return data;
};

export const handleGetCartItems = async (cartKey) => {
  const params = {
    ...(cartKey && { cartKey }),
  };

  const { data } = await instance.get("/buyer/cart", { params });
  return data;
};

export const handleMergeUserCartWithCartKey = async (payload) => {
  const { data } = await instance.post(`/buyer/cart/merge`, payload);

  return data;
};

export const handleClearCart = async () => {
  const { data } = await instance.delete(`/buyer/cart`);
  return data;
};
