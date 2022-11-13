import { combineReducers } from "redux";
import Routes from "./Routes";
import BarGame from "./BarGame";
import RouteDetail from "./RouteDetail";
import Final from "./Final";
import TeamDetail from "./TeamDetail";
import UserProfile from "./UserProfile";
import UserFeedback from "./UserFeedback";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SaveTeam from "./SaveTeam";
import TapasDetail from "./TapasDetail";


const rootReducer = combineReducers({
  Routes,
  BarGame,
  RouteDetail,
  Final,
  TeamDetail,
  UserProfile,
  SignIn,
  SignUp,
  SaveTeam,
  UserFeedback,
  TapasDetail,
});

export default rootReducer;
