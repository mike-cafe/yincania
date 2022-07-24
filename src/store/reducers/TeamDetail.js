import {
  GET_TEAM_DETAIL,
  GET_TEAM_DETAIL_FAILURE,
  GET_TEAM_DETAIL_SUCCESS,
  GET_USERNAMES,
  GET_USERNAMES_SUCCESS,
  GET_USERNAMES_FAILURE,
} from "../types";

const INIT_STATE = {
  data: null,
  usernames:null,
  loading: false,
};

const TeamDetail = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TEAM_DETAIL:
      return { ...state, loading: true };
    case GET_TEAM_DETAIL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_TEAM_DETAIL_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    case GET_USERNAMES:
      return { ...state, loading: true };
    case GET_USERNAMES_SUCCESS:
      return { ...state, loading: false, usernames: action.payload };
    case GET_USERNAMES_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    default:
      return { ...state };
  }
};

export default TeamDetail;
