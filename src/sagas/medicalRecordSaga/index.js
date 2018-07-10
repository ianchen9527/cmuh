import { put, takeEvery } from "redux-saga/effects"
import firebase from "../../firebase"
import { CREATE_MEDICAL_RECORD } from "../../constants/actionTypes"
import {
  onCreateMedicalRecordFail,
  onCreateMedicalRecordSuccess
} from "../../actions/medicalRecord"

export function* createMedicalRecord(action) {
  try {
    const medicalRecordRef = yield firebase
      .database()
      .ref(`medicalRecords/${action.payload.id}`)
      .set({ name: "123" })
    put(onCreateMedicalRecordSuccess(medicalRecordRef.id))
  } catch (error) {
    console.log(error)
    yield put(onCreateMedicalRecordFail(error.message))
  }
}

export function* watchCreateMedicalRecord() {
  yield takeEvery(CREATE_MEDICAL_RECORD, createMedicalRecord)
}
