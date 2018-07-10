import { all } from "redux-saga/effects"
import { watchLogIn, watchLogOut } from "./authenticationSaga"
import { watchCreateMedicalRecord } from "./medicalRecordSaga"

export default function* rootSaga() {
  yield all([watchLogIn(), watchLogOut(), watchCreateMedicalRecord()])
}
