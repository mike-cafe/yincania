import "./App.css";
import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import RutasList from "./pages/RutasList";
import RutasDetail from "./pages/RutasDetail";
import CreateTeam from "./pages/CreateTeam";
import TeamDetail from "./pages/TeamDetail";
import RutasPlay from "./pages/RutasPlay";
import AppSignIn from "./pages/Login";
import SignUp from "./pages/Signup";
import RutasFinished from "./pages/RutasFinished";
import Tutorial from "./pages/Tutorial";
import DefaultLayout from "./pages/DefaultLayout";
import BarGame from "./pages/BarGame";
import UserProfile from "./pages/UserProfile";
import Start from "./pages/Start";
import { useAuth } from "./contexts/AuthContext";
import JoinTeam from "./pages/JoinTeam";
import TapaDetail from "./pages/TapaDetail";
import { LocalStorage } from "./store/LocalStorage";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import { PageNotFound } from "./components/PageNotFound";

function AppRouting(props) {
  return (
    <Routes>
      <Route path="/" element={<AppSignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/tutorial" exact element={<Tutorial />} />
      <Route path="/tapa/:id" exact element={<TapaDetail />} />

      <Route path="/app" element={<DefaultLayout />}>
        <Route
          path=""
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        >
          <Route path="detail/:id" element={<RutasDetail />} />
          <Route path="routes" element={<RutasList />} />
          <Route path="play/:id" exact element={<RutasPlay />} />
          <Route path="finished/:id" exact element={<RutasFinished />} />
          <Route path="team/:team/game/:game" exact element={<BarGame />} />
          <Route path="join/team" exact element={<JoinTeam />} />
          <Route path="view/team/:id" exact element={<TeamDetail />} />
          <Route path="create/team/:id" exact element={<CreateTeam />} />
          <Route path="user" exact element={<UserProfile />} />
          <Route path="" element={<Start />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRouting;

function RequireAuth({ children }) {
  let authToken = localStorage.getItem(LocalStorage.TOKEN);
  let { currentUser, logout } = useAuth();

  let location = useLocation();
  if(currentUser && !currentUser.emailVerified){
    logout();
  }
  if ((!currentUser && !authToken)) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    logout();

    return (
      <Navigate
        to={`/?next=${location.pathname+location.search}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

