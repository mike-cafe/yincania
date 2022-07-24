import { combineReducers } from "redux";
import Routes from "./Routes";
import BarGame from "./BarGame";
import RouteDetail from "./RouteDetail";
import Final from "./Final";
import TeamDetail from "./TeamDetail";
import UserProfile from "./UserProfile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";



const rootReducer = combineReducers({
  Routes,
  BarGame,
  RouteDetail,
  Final,
  TeamDetail,
  UserProfile,
  SignIn,
  SignUp,
});

export default rootReducer;
