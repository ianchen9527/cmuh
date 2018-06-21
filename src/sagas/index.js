import { all } from "redux-saga/effects"
import { watchLogIn } from "./authenticationSaga"
import { watchRequestCategoties } from "./librariesSaga"

export default function* rootSaga() {
  yield all([watchLogIn(), watchRequestCategoties()])
}
