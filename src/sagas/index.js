import { all } from "redux-saga/effects"
import { watchLogIn } from "./authenticationSaga"

export default function* rootSaga() {
  yield all([watchLogIn()])
}
