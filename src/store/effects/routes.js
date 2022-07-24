import { all, fork, put, takeEvery, retry } from "redux-saga/effects";
import { getRoutesDataSuccess, getRoutesDataFailure } from "../actions/Routes";
import { GET_ROUTES } from "../types";

import { db } from "../../utils/init-firebase";
import { collection, getDocs } from "firebase/firestore";

const MAX_RETRY_COUNT = 2;
const RETRY_INTERVAL = 3000;

const getRoutesData = async () => {
  const collectionRef = collection(db, `routes`);
  const docSnap = await getDocs(collectionRef);

  let routes =[];
  docSnap.forEach(
    (route) => routes = [ ...routes, {id:route.id,...route.data()} ]
  );
  return routes.sort((a,b)=>a.date>b.date);
};

function* getRoutes() {
  try {
    const data = yield retry(MAX_RETRY_COUNT, RETRY_INTERVAL, getRoutesData);
    if (data) yield put(getRoutesDataSuccess(data));
  } catch (error) {
    yield put(getRoutesDataFailure(error));
  }
}
export function* callRoutes() {
  yield takeEvery(GET_ROUTES, getRoutes);
}

export default function* rootSaga() {
  yield all([fork(callRoutes)]);
}
