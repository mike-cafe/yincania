import React, { createContext, useContext, useEffect, useState } from "react";
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
  signInWithPopup,
  updateEmail,
  sendEmailVerification,
  getAuth,
  verifyPasswordResetCode,
  checkActionCode,
  applyActionCode,
  reauthenticateWithCredential,
  getRedirectResult,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../utils/init-firebase";
import { useToast } from "@chakra-ui/react";
import { db } from "../utils/init-firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  const [additionalInfo, setAdditionalInfo] = useState(null);

  const toast = useToast();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {}, [currentUser]);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        setAdditionalInfo({
          ...getAdditionalUserInfo(result),
          isSocial: true,
        });
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }, [auth]);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then((result) => {
      setAdditionalInfo({ ...getAdditionalUserInfo(result), isSocial: false });
      return result;
    });
  }

  function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
          setAdditionalInfo({
          ...getAdditionalUserInfo(result),
          isSocial: false,
        });
        return result;
      }).catch((error) => {
        // Handle Errors here.
        throw new Error(error.code)
      })
  }

  function forgotPassword(email) {
    let redirectUrl;
    if(window.location.hostname === "localhost"){
      redirectUrl = "http://localhost:3000"
    }else{
      redirectUrl = "https://react-coffee-a2736.web.app/"
    }
    return sendPasswordResetEmail(auth, email, {
      url: redirectUrl
    }).then()
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    return signOut(auth).then(() => {
      setAdditionalInfo(null);
      localStorage.clear();
    });
  }

  function signInWithGoogle(fnCallback) {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    // return signInWithRedirect(auth, provider);
    return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const { isNewUser,...rest } = getAdditionalUserInfo(result);
      setAdditionalInfo({
        isNewUser:isNewUser,
        ...rest,
        isSocial: true,
      });
      
      if (isNewUser) {
        return createUserProfile(
          {
            avatar: "Quesiko",
            username: "",
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            routes: [],
          }
        ).finally((data)=>{
          fnCallback(result);
          return result
        })
        .catch((error)=>{
          console.error("error in create user profile",error)
        })
      }else{
        fnCallback(result);
        return result
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      throw new Error(error.code)
    })
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
    return reauthenticateWithCredential(user, credential).then((result) => {
      setAdditionalInfo({ ...getAdditionalUserInfo(result), isSocial: false });
      return result;
    });
  }
  function reauthenticate(currentPassword) {
    const auth = getAuth();
    const user = auth.currentUser;
    return EmailAuthProvider.credential(user.email, currentPassword);
  }

  function createUserProfile(userData){
    const uid = userData.uid;
    const docRef = doc(db, "users", uid);
    
      return setDoc(
        docRef,
        {
          ...userData,
          newRoute: null,
          routes: [],
        },
        { merge: true }
      ).then(() => {
        
        return getDoc(docRef).catch(
          (error)=>console.error("error while getDoc",error)
        )
      })
      .then((docData)=>{
        
        return docData.data()
      })
      .catch((e)=>console.error("error when saving",e))
    };

  function manageRedirectResult(authLocal){
    
    return getRedirectResult(authLocal)
      .then(async (result) => {
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        
        const { isNewUser,...rest } = getAdditionalUserInfo(result);
        if (isNewUser) {
          return createUserProfile(
            {
              avatar: "Quesiko",
              username: "",
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              routes: [],
            }
          ).finally((data)=>{
            
            return result
          })
          .catch((error)=>{
            console.error("error in create user profile",error)
          })
        }else{
          return result
        }
      })
      .catch((error) => {
        console.error("catched error in redirect",error);
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const value = {
    currentUser,
    additionalInfo,
    signInWithGoogle,
    login,
    registerUser,
    logout,
    forgotPassword,
    resetPassword,
    // verifyToken,
    updateUserEmail,
    reauthenticate,
    sendUserEmailVerification,
    checkActionCodeVerification,
    verifyPasswordResetCodeVerification,
    applyActionCodeVerification,
    reauthenticateUser,
    createUserProfile,
    manageRedirectResult,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};
