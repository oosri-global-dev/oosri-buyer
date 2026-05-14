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
  SET_CURRENCY,
  SET_FX_RATES,
} from "./types";
import { CURRENCIES } from "@/data-helpers/currency";
import {
  clearAuthSession,
  hasBuyerSession,
  getDataInCookie,
  storeDataInCookie,
} from "@/data-helpers/auth-session";
import _ from "lodash";
import { fetchUser } from "@/network/auth";

const DEFAULT_FX_RATES = { USD: 1, NGN: 1550, GBP: 0.79, EUR: 0.92 };

export const MainContext = createContext({
  user: {},
  toastbox: { type: "", message: "", duration: 5000 },
  cart: [],
  loadingModal: false,
  isLoadingUser: false,
  buyNowItem: null,
  setBuyNowItem: () => { },
  currency: "USD",
  setCurrency: () => { },
  fxRates: DEFAULT_FX_RATES,
});

export const MainProvider = ({ children }) => {
  const initialState = useContext(MainContext);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const hasBootstrapped = useRef(false);

  const setCurrency = (code) => {
    if (!CURRENCIES[code]) return;
    dispatch({ type: SET_CURRENCY, payload: code });
    if (typeof window !== "undefined") {
      localStorage.setItem("oosri__currency", code);
    }
  };

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
    targetQuantity,
    setIsUpdatingQuantity = null
  ) => {
    const cartKey = getDataInCookie("public__cart__key");
    setIsUpdatingQuantity?.(true);

    // The cart API accumulates quantities (adds the sent value to the existing qty).
    // We need to send the DELTA (difference), not the target absolute quantity.
    const itemId = item?._id || item?.id;
    const currentCartItem = state.cart.find(
      (c) => (c._id || c.id)?.toString() === itemId?.toString()
    );
    const currentQty = currentCartItem?.quantity ?? item?.quantity ?? 1;
    const delta = targetQuantity - currentQty;

    if (delta === 0) {
      setIsUpdatingQuantity?.(false);
      return;
    }

    try {
      await handleAddToCart({
        items: [{ productId: itemId, quantity: delta }],
        ...(_.isEmpty(state.user) && { cartKey }),
      });
      await handleUpdateCartItemsInContext(cartKey, { silent: true });
    } catch (err) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: err?.response?.data?.message || "Sorry, an error occurred",
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
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("oosri__currency");
    if (saved && CURRENCIES[saved]) {
      dispatch({ type: SET_CURRENCY, payload: saved });
    }
  }, []);

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
    currency: state.currency || "USD",
    setCurrency,
    fxRates: state.fxRates || DEFAULT_FX_RATES,
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

export const useCurrency = () => {
  const { currency, setCurrency, fxRates } = useMainContext();
  return { currency, setCurrency, fxRates, currencyData: CURRENCIES[currency] || CURRENCIES.USD };
};
