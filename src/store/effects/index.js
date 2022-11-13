import { all } from "redux-saga/effects";
import routes from './routes';
import bargame from './bargame';
import routedetail from './routedetail';
import final from './final';
import teamdetail from './teamdetail';
import usernames from './usernames';
import userprofile from './userprofile'
import signIn from './signIn';
import saveTeam from './saveTeam';
import tapasdetail from './tapasdetail';

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
    saveTeam(),
    tapasdetail(),
  ]);
}
