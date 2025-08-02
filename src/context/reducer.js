import {
  CURRENT_USER,
  TOAST_BOX,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from "./types";

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case CURRENT_USER:
      return {
        ...state,
        user: payload || undefined,
      };
    case TOAST_BOX:
      return {
        ...state,
        toastbox: payload || { type: "", message: "", duration: 4000 },
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== payload._id),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === payload._id
            ? { ...item, quantity: payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};
