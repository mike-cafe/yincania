import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcJhYDEMmVmnEAJxGhQ8vXRDxXnLz9fcw",
  authDomain: "react-coffee-a2736.firebaseapp.com",
  projectId: "react-coffee-a2736",
  storageBucket: "react-coffee-a2736.appspot.com",
  messagingSenderId: "225030756508",
  appId: "1:225030756508:web:7ab655d2e38bd48937f559",
  measurementId: "G-9DKF5X404G",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app, "europe-west3");

if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings:true});
}

// export default firebase;
export { db, functions, auth };
