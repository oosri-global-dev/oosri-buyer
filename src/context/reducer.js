import { CURRENT_USER, PAGE_TITLE, TOAST_BOX } from "./types";

export const Reducer = (state, { type, payload }) => {
  switch (type) {
    case CURRENT_USER:
      return {
        ...state,
        user: payload || undefined,
      };
    case PAGE_TITLE:
      return {
        ...state,
        pageTitle: payload || "",
      };
    case TOAST_BOX:
      return {
        ...state,
        toastbox: payload || { type: "", message: "", duration: 4000 },
      };

    default:
      return state;
  }
};
