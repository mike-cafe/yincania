import {
    SHOW_TOAST,
    RESET_TOAST,
  } from "../types";
  
  export const showToast = (payload) => {
    return {
      type: SHOW_TOAST,
      payload: payload,
    };
  };

  export const resetToast = () => {
    return {
      type: RESET_TOAST,
    };
  };
