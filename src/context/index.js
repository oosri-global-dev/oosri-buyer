import { createContext, useContext, useEffect, useReducer } from "react";
import { Reducer } from "./reducer";
import {
  handleAddToCart,
  handleGenerateUniqueCartKey,
  handleGetCartItems,
  handleRemoveFromCart,
} from "@/network/cart";
import {
  CURRENT_USER,
  LOADING_MODAL,
  LOADING_USER,
  TOAST_BOX,
  UPDATE_QUANTITY,
} from "./types";
import {
  getDataInCookie,
  storeDataInCookie,
} from "@/data-helpers/auth-session";
import _ from "lodash";
import { fetchUser } from "@/network/auth";

export const MainContext = createContext({
  user: {},
  toastbox: { type: "", message: "", duration: 5000 },
  cart: [],
  loadingModal: false,
  isLoadingUser: false,
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

  const removeFromCart = async (item, setIsLoadingBtn, setModalLoadingBtn) => {
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
      setModalLoadingBtn?.(false);
    }
  };

  const updateQuantity = async (
    item,
    quantity,
    setIsUpdatingQuantity = null
  ) => {
    const cartKey = getDataInCookie("public__cart__key");
    setIsUpdatingQuantity?.(true);

    //api to update prouct quantity before dispatching
    try {
      const res = await handleAddToCart({
        items: [{ productId: item?._id, quantity }],
        ...(_.isEmpty(state.user) && { cartKey }), //add cartkey is user is empty
      });

      dispatch({
        type: UPDATE_QUANTITY,
        payload: { ...item, quantity },
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
      setIsUpdatingQuantity?.(false);
    }
  };

  const handleUpdateCartItemsInContext = async (cartKey) => {
    dispatch({
      type: LOADING_MODAL,
      payload: true,
    });
    try {
      const res = await handleGetCartItems(cartKey || "");
      const remoteCart = res?.body?.cartItems;

      dispatch({
        type: "CART",
        payload: remoteCart || [],
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: LOADING_MODAL,
        payload: false,
      });
    }
  };

  const handleUpdateCurrentUser = async () => {
    //update the user object
    dispatch({
      type: LOADING_USER,
      payload: true,
    });

    try {
      const currentUser = await fetchUser();
      //dispatch the user function
      dispatch({
        type: CURRENT_USER,
        payload: {
          ...currentUser?.body?.user,
          lastLogin: currentUser?.body?.lastLogin,
        },
      });
    } catch (err) {
      // If fetch fails, user doesn't exist or token is invalid
      // Redirect to login if not already on login page
      // Note: Using window.location.href causes a full page reload,
      // but since GeneralLayout uses router.replace() for initial redirects,
      // the history should be correct for most cases
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    } finally {
      dispatch({
        type: LOADING_USER,
        payload: false,
      });
    }

    //update the user cart
  };

  const handleGenerateCartKeyForVisitor = async () => {
    try {
      const res = await handleGenerateUniqueCartKey();

      if (res?.body?.cartKey) {
        storeDataInCookie("public__cart__key", res?.body?.cartKey);
      }
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "Error generating a cart key on your device",
        },
      });
    }
  };

  useEffect(() => {
    const userToken = getDataInCookie("access_token");
    const publicCartKey = getDataInCookie("public__cart__key");

    if (userToken && _.isEmpty(state.user)) {
      //update user
      handleUpdateCurrentUser();

      //update cart items
      handleUpdateCartItemsInContext();
    }

    //if user is not logged in
    if (_.isEmpty(state.user)) {
      if (!publicCartKey && !userToken) {
        handleGenerateCartKeyForVisitor();
      } else {
        //update the cart
        handleUpdateCartItemsInContext(publicCartKey);
      }
    }
  }, [state.user]);

  const value = {
    user: state.user,
    toastbox: state.toastbox,
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    dispatch,
    loadingModal: state.loadingModal,
    isLoadingUser: state.isLoadingUser,
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
