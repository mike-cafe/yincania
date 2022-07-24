import "./App.css";
import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RutasList from "./pages/RutasList";
import RutasDetail from "./pages/RutasDetail";
import { CreateTeam } from "./pages/CreateTeam";
import TeamDetail from "./pages/TeamDetail";
import RutasPlay from "./pages/RutasPlay";
import AppSignIn from "./pages/Login";
import SignUp from "./pages/Signup";
import { RutasPlayFinish } from "./pages/RutasPlayFinish";
import { Tutorial } from "./pages/Tutorial";
import DefaultLayout from "./pages/DefaultLayout";
import BarGame from "./pages/BarGame";
import UserProfile from "./pages/UserProfile";
import Start from "./pages/Start";
import { useAuth } from "./contexts/AuthContext";

function AppRouting(props) {
  return (
    <Routes>
      <Route path="/login" element={<AppSignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tutorial" exact element={<Tutorial />} />
      <Route path="/app" element={<RequireAuth><DefaultLayout /></RequireAuth>}>
        <Route path="detail/:id" element={<RutasDetail />} />
        <Route
          path="routes"
          element={
              <RutasList />
          }
        />
        <Route path="play/:id" exact element={<RutasPlay />} />
        <Route path="finished/:id" exact element={<RutasPlayFinish />} />
        <Route path="route/:routeID/game/:barID" exact element={<BarGame />} />
        <Route path="view/team/:id" exact element={<TeamDetail />} />
        <Route path="create/team/:id" exact element={<CreateTeam />} />
        <Route path="user" exact element={<UserProfile />} />
        <Route path="" element={<Start />} />
      </Route>
    </Routes>
  );
}

export default AppRouting;

function RequireAuth({children}) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate
        to={`/login${location.search}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
