import { createContext, useContext, useReducer } from "react";
import { Reducer } from "./reducer";

export const MainContext = createContext({
  user: {},
  toastbox: { type: "", message: "", duration: 5000 },
  cart: [],
});

export const MainProvider = ({ children }) => {
  const initialState = useContext(MainContext);
  const [state, dispatch] = useReducer(Reducer, initialState);

  const addToCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };

  const removeFromCart = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };

  const value = {
    user: state.user,
    toastbox: state.toastbox,
    cart: state.cart,
    addToCart,
    removeFromCart,
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
