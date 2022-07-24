import React from "react";
import { connect } from "react-redux";
import { Navigate,Route, useLocation, useNavigate } from "react-router-dom";
import AppSignIn from "../pages/Login";
import { LocalStorage } from "../store/LocalStorage";
import { userData } from "../store/actions/SignIn";
import { useAuth } from "../contexts/AuthContext";
import RutasList from "./RutasList";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const Start = (props) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  if (localStorage.getItem(LocalStorage.TOKEN) == null) {
      if (query.get("mode") === "verifyEmail") {
        return <Navigate to={`/login${location.search}`} />;
      } else if (query.get("mode") === "resetPassword") {
        return <Navigate to={`/reset-password${location.search}`} />;
      } else {
        return <Navigate to={"/login"} />;
      }
  } else if (currentUser) {
      props.userData({ user: currentUser, navigate });
      return <Navigate to={"/routes"} />;
  }
};
const mapStateToProps = ({ SignIn }) => {
  const { user } = SignIn;
  return { user };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userData: (data) => {
      dispatch(userData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
