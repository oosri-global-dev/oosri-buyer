import { getDataInCookie } from "@/data-helpers/auth-session";
import { instance } from "./axios";

let userToken;

if (typeof window !== "undefined") {
  userToken = getDataInCookie("access_token");
}

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

  const { data } = await instance.delete(
    `/buyer/cart/item/${itemId}`,
    config 
  );

  return data;
};

export const handleGetCartItems = async () => {
  const { data } = await instance.get(`/buyer/cart`);

  return data;
};
