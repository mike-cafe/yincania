import {
  GET_TEAM_DETAIL,
  GET_TEAM_DETAIL_FAILURE,
  GET_TEAM_DETAIL_SUCCESS,
  GET_USERNAMES,
  GET_USERNAMES_SUCCESS,
  GET_USERNAMES_FAILURE,
  RESET_TEAM_STATE,
  FIND_TEAM,
  FIND_TEAM_SUCCESS,
  FIND_TEAM_FAILURE,
  RESET_FIND_TEAM
} from "../types";

const INIT_STATE = {
  data: null,
  usernames:null,
  loading: false,
  teamFound:null,
};

const TeamDetail = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESET_TEAM_STATE:
      return INIT_STATE;
    case GET_TEAM_DETAIL:
      return { ...state, loading: true };
    case GET_TEAM_DETAIL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_TEAM_DETAIL_FAILURE:
      return { ...state, isError: true, loading: false, err: action.payload };
    case FIND_TEAM:
      return { ...state, loading: true };
    case FIND_TEAM_SUCCESS:
      return { ...state, loading: false,teamFound:true };
    case FIND_TEAM_FAILURE:
      return { ...state, loading: false,teamFound:false };
    case RESET_FIND_TEAM:
      return { ...state,loading:false, teamFound:false };
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
