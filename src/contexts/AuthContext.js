import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/init-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  EmailAuthProvider,
  signOut,
  confirmPasswordReset,
  signInWithRedirect,
  updateEmail,
  sendEmailVerification,
  getAuth,
  verifyPasswordResetCode,
  checkActionCode,
  applyActionCode,
  reauthenticateWithCredential,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  verifyToken: () => Promise(),
  updateUserEmail: () => Promise(),
  sendUserEmailVerification: () => Promise(),
  checkActionCodeVerification: () => Promise(),
  verifyPasswordResetCodeVerification: () => Promise(),
  applyActionCodeVerification: () => Promise(),
  reauthenticateUser: () => Promise(),
  reauthenticate: () => Promise(),
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {}, [currentUser]);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function verifyToken(token) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 200, data: "Token verified" });
      }, 3000);
    });
  }
  function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `https://app.notion.coffee/login`,
    });
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithRedirect(auth, provider);
  }

  function updateUserEmail(email) {
    const auth = getAuth();
    return updateEmail(auth.currentUser, email);
  }
  function sendUserEmailVerification() {
    const auth = getAuth();
    return sendEmailVerification(auth.currentUser);
  }

  function checkActionCodeVerification(actionCode) {
    return checkActionCode(auth, actionCode);
  }
  function verifyPasswordResetCodeVerification(actionCode) {
    return verifyPasswordResetCode(auth, actionCode);
  }
  function applyActionCodeVerification(actionCode) {
    return applyActionCode(auth, actionCode);
  }
  function reauthenticateUser(credential) {
    const auth = getAuth();
    const user = auth.currentUser;
    return reauthenticateWithCredential(user, credential);
  }
  function reauthenticate(currentPassword) {
    const auth = getAuth();
    const user = auth.currentUser;
    return EmailAuthProvider.credential(user.email, currentPassword);
  }

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    registerUser,
    logout,
    forgotPassword,
    resetPassword,
    verifyToken,
    updateUserEmail,
    reauthenticate,
    sendUserEmailVerification,
    checkActionCodeVerification,
    verifyPasswordResetCodeVerification,
    applyActionCodeVerification,
    reauthenticateUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
