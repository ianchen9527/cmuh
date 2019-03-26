import { all } from "redux-saga/effects"
import { watchLogIn, watchLogOut } from "./authenticationSaga"
import {
  watchSaveMedicalRecord,
  watchFetchMedicalRecord
} from "./medicalRecordSaga"
import { watchSaveMedicine, watchFetchMedicines } from "./medicinesSaga";


export default function* rootSaga() {
  yield all([
    watchLogIn(),
    watchLogOut(),
    watchSaveMedicalRecord(),
    watchFetchMedicalRecord(),
    watchSaveMedicine(),
    watchFetchMedicines(),
  ])
}
