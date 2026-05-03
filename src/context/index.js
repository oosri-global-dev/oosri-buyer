import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
  clearAuthSession,
  hasBuyerSession,
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
  buyNowItem: null,
  setBuyNowItem: () => { },
});

export const MainProvider = ({ children }) => {
  const initialState = useContext(MainContext);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const hasBootstrapped = useRef(false);

  const addToCart = async (item, setIsLoadingBtn) => {
    const cartKey = getDataInCookie("public__cart__key");
    setIsLoadingBtn(true);

    //api to add to cart before dispatching
    try {
      await handleAddToCart({
        items: [{ productId: item?._id, quantity: 1 }],
        ...(_.isEmpty(state.user) && { cartKey }), //add cartkey is user is empty
      });
      await handleUpdateCartItemsInContext(cartKey, { silent: true });
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

      await handleRemoveFromCart(
        item?._id,
        params.cartKey // will be undefined if conditions aren't met
      );
      await handleUpdateCartItemsInContext(params.cartKey, { silent: true });
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
      await handleAddToCart({
        items: [{ productId: item?._id, quantity }],
        ...(_.isEmpty(state.user) && { cartKey }), //add cartkey is user is empty
      });
      await handleUpdateCartItemsInContext(cartKey, { silent: true });
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

  const handleUpdateCartItemsInContext = async (
    cartKey,
    { silent = false } = {}
  ) => {
    if (!silent) {
      dispatch({
        type: LOADING_MODAL,
        payload: true,
      });
    }
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
      if (!silent) {
        dispatch({
          type: LOADING_MODAL,
          payload: false,
        });
      }
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
      clearAuthSession();
      // If fetch fails, user doesn't exist or token is invalid
      // Redirect to login if not already on login page
      // Note: Using window.location.href causes a full page reload,
      // but since GeneralLayout uses router.replace() for initial redirects,
      // the history should be correct for most cases
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.replace("/login");
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
    if (hasBootstrapped.current) {
      return;
    }

    hasBootstrapped.current = true;

    const userHasSession = hasBuyerSession();
    const publicCartKey = getDataInCookie("public__cart__key");

    if (userHasSession) {
      handleUpdateCurrentUser();
      handleUpdateCartItemsInContext(undefined, { silent: true });
      return;
    }

    if (!publicCartKey) {
      handleGenerateCartKeyForVisitor();
    } else {
      handleUpdateCartItemsInContext(publicCartKey, { silent: true });
    }
  }, []);

  const value = {
    user: state.user,
    toastbox: state.toastbox,
    cart: state.cart,
    buyNowItem,
    setBuyNowItem,
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
