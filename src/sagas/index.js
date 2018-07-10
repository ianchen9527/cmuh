import { all } from "redux-saga/effects"
import { watchLogIn, watchLogOut } from "./authenticationSaga"
import { watchSaveMedicalRecord } from "./medicalRecordSaga"

export default function* rootSaga() {
  yield all([watchLogIn(), watchLogOut(), watchSaveMedicalRecord()])
}
