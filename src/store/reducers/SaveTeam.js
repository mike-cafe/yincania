import { boolean } from "yup";
import {
  SAVE_TEAM_DATA,
  SAVE_TEAM_DATA_SUCCESS,
  SAVE_TEAM_DATA_FAILURE,
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
} from "../types";

/**
 * initial auth user
 */
const INIT_STATE = {
  data: null,
  loading: false,
  removedUser:null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SAVE_TEAM_DATA:
      return { ...state, loading: true };
    case SAVE_TEAM_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case SAVE_TEAM_DATA_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    case REMOVE_USER:
      return { ...state, loading: true };
    case REMOVE_USER_SUCCESS:
      return { ...state, loading: false,removedUser:true};
    case REMOVE_USER_FAILURE:
      return { ...state, removedUser: false, loading: false, err: action.payload };
    default:
      return { ...state };
  }
};
