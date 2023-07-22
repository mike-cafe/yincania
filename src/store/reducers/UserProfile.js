import { userProfile } from "../../data";
import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  REMOVE_TEAM,
  REMOVE_TEAM_SUCCESS,
  REMOVE_TEAM_FAILURE,
  SAVE_USER_DATA,
  RESET_USER_DATA,
} from "../types";

const INIT_STATE = {
  data: null,
  loading: false,
};

const UserProfile = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...state, loading: true };
    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_USER_PROFILE_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    case REMOVE_TEAM:
      return { ...state, loading: true };
    case REMOVE_TEAM_SUCCESS:
      return { ...state, loading: false, removedTeam: true };
    case REMOVE_TEAM_FAILURE:
      return { ...state,  removedTeam: false, loading: false, err: action.payload };
    case SAVE_USER_DATA:
        return { ...state, loading: true };  
    case RESET_USER_DATA:
        return INIT_STATE  
    default:
      return { ...state };
  }
};

export default UserProfile;
