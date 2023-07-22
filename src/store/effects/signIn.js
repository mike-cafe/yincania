import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { createStandaloneToast } from "@chakra-ui/react";
import { db } from "../../utils/init-firebase";
import { doc, getDoc } from "firebase/firestore";
import { RETRY_INTERVAL, MAX_RETRY_COUNT } from "../constants";
import {
  userDataSuccess,
  userDataFailure,
  userData,
  verifyTokenSuccess,
  verifyTokenFailure,
  reSendEmailSuccess,
  reSendEmailFailure,
} from "../actions/SignIn";
import { USER_DATA, VERIFY_TOKEN, RESEND_EMAIL } from "../types";
import { LocalStorage } from "../LocalStorage";
import { Toast } from "../Toast";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";

const toast = createStandaloneToast();

const getUserDocumentApi = async (payload) => {
  const docRef = doc(db, `users/${payload.user?.uid}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
function* getUserDocument({ payload }) {
  try {
    const data = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      getUserDocumentApi,
      payload
    );
    if (data) {
      yield put(userDataSuccess(JSON.stringify(data)));
      localStorage.setItem(LocalStorage.TOKEN, payload.user.accessToken);
      localStorage.setItem(LocalStorage.USER_ID, payload.user.uid);
      if(data.tutorial){      
        payload.navigate(payload.next);
      }else{
        payload.navigate("/tutorial");
      }
    } else {
      yield put(
        userDataFailure({
          message: "No documents found",
          status: "No Data Found",
        })
      );
    }
  } catch (error) {
    yield put(userDataFailure(error));
  }
}

export function* callUserDocument() {
  yield takeEvery(USER_DATA, getUserDocument);
}

const verifyTokenApi = async (payload) => {
  return getRedirectResult(payload.auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    payload.navigate(
      {
        pathname: payload.next,
      },
      { replace: true }
    );
    return { status: 200, data: "Token verified" }
  })
  .catch((error) => {
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

};

function* verify_Token({ payload }) {
  try {
    const response = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      verifyTokenApi,
      payload
    );
    if (response) {
      if (payload.socialLogin) {
        yield put(
          userData({
            user: payload.user,
            history: payload.history,
            socialLogin: payload.socialLogin,
          })
        );
        yield put(verifyTokenSuccess(response));
      } else {
        yield put(verifyTokenSuccess(response));
      }
    }
  } catch (error) {
    if (payload.socialLogin) {
      toast({
        position: "bottom-center",
        title: Toast.SocialLoginVerification.error.title,
        description: Toast.SocialLoginVerification.error.description,
        duration: Toast.SocialLoginVerification.error.duration,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        position: "bottom-center",
        title: Toast.EmailVerification.error.title,
        description: Toast.EmailVerification.error.description,
        duration: Toast.EmailVerification.error.duration,
        status: "error",
        isClosable: true,
      });
    }

    yield put(verifyTokenFailure(error));
  }
}

export function* verifyToken() {
  yield takeEvery(VERIFY_TOKEN, verify_Token);
}

const resendEmailApi = async (payload) => {};
function* resend_Email({ payload }) {
  try {
    const response = yield retry(
      MAX_RETRY_COUNT,
      RETRY_INTERVAL,
      resendEmailApi,
      payload
    );
    if (response) {
      yield put(reSendEmailSuccess(response));
    }
  } catch (error) {
    toast({
      position: "bottom-center",
      title: error.Message,
      description: error.status,
      duration: 3000,
      status: "error",
      isClosable: true,
    });
    yield put(reSendEmailFailure(error));
  }
}

export function* resendEmail() {
  yield takeEvery(RESEND_EMAIL, resend_Email);
}

export default function* rootSaga() {
  yield all([fork(callUserDocument), fork(verifyToken), fork(resendEmail)]);
}
