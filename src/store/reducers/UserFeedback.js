import { SHOW_TOAST, RESET_TOAST } from "../types";

const INIT_STATE = {
  toast: null,
};

const UserFeedback = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return { ...state, toast: action.payload };
    case RESET_TOAST:
      return { ...state, toast: null };
    default:
      return { ...state };
  }
};

export default UserFeedback;
