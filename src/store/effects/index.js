import { all } from "redux-saga/effects";
import routes from './routes';
import bargame from './bargame';
import routedetail from './routedetail';
import final from './final';
import teamdetail from './teamdetail';
import usernames from './usernames';
import userprofile from './userprofile'
import signIn from './signIn';

export default function* rootSaga() {
  yield all([
    routes(),
    bargame(),
    routedetail(),
    final(),
    teamdetail(),
    usernames(),
    userprofile(),
    signIn(),
  ]);
}
