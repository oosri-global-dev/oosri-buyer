import {
  deleteDataInCookie,
  getDataInCookie,
} from "@/data-helpers/auth-session";
import { handleMergeUserCartWithCartKey } from "@/network/cart";

const handleMergeCartAction = async () => {
  const cartKey = getDataInCookie("public__cart__key");

  if (!cartKey) {
    return;
  }

  const res = await handleMergeUserCartWithCartKey({ cartKey });

  if (res?.status === 200) {
    //remove the cart key from your device
    deleteDataInCookie("public__cart__key");
  }
};

export const loginActions = {
  MERGE_CART: handleMergeCartAction,
};
