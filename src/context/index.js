import { createContext, useContext, useReducer } from "react";
import { Reducer } from "./reducer";
import { handleAddToCart, handleRemoveFromCart } from "@/network/cart";
import { TOAST_BOX, UPDATE_QUANTITY } from "./types";
import { getDataInCookie } from "@/data-helpers/auth-session";
import _ from "lodash";

export const MainContext = createContext({
  user: {},
  toastbox: { type: "", message: "", duration: 5000 },
  cart: [],
});

export const MainProvider = ({ children }) => {
  const initialState = useContext(MainContext);
  const [state, dispatch] = useReducer(Reducer, initialState);

  const addToCart = async (item, setIsLoadingBtn) => {
    const cartKey = getDataInCookie("public__cart__key");
    setIsLoadingBtn(true);

    //api to add to cart before dispatching
    try {
      const res = await handleAddToCart({
        items: [{ productId: item?._id, quantity: 1 }],
        ...(_.isEmpty(state.user) && { cartKey }), //add cartkey is user is empty
      });

      dispatch({
        type: "ADD_TO_CART",
        payload: { ...item, quantity: item?.quantity ? item?.quantity : 1 },
      });
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: err?.response?.data?.message || "Sorry, an error occured",
        },
      });
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const removeFromCart = async (
    item,
    setIsLoadingBtn,
    setModalLoadingBtn = false
  ) => {
    const cartKey = getDataInCookie("public__cart__key");

    setIsLoadingBtn(true);

    try {
      const params = {};
      if (_.isEmpty(state.user) && cartKey) {
        params.cartKey = cartKey;
      }

      const res = await handleRemoveFromCart(
        item?._id,
        params.cartKey // will be undefined if conditions aren't met
      );

      dispatch({
        type: "REMOVE_FROM_CART",
        payload: item,
      });
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: err?.response?.data?.message || "Sorry, an error occurred",
        },
      });
    } finally {
      setIsLoadingBtn(false);
      setModalLoadingBtn?.(false); // Optional chaining for safety
    }
  };

  const updateQuantity = (item, quantity) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { ...item, quantity },
    });
  };

  

  const value = {
    user: state.user,
    toastbox: state.toastbox,
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    dispatch,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
