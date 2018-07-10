import { all } from "redux-saga/effects"
import { watchLogIn, watchLogOut } from "./authenticationSaga"

export default function* rootSaga() {
  yield all([watchLogIn(), watchLogOut()])
}
