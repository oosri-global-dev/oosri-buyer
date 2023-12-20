import { CURRENT_USER, PAGE_TITLE } from "./types";

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

    default:
      return state;
  }
};
