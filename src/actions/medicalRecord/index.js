import {
  SAVE_MEDICAL_RECORD,
  SAVE_MEDICAL_RECORD_SUCCESS,
  SAVE_MEDICAL_RECORD_FAIL
} from "../../constants/actionTypes"

export const onSaveMedicalRecord = id => {
  return {
    type: SAVE_MEDICAL_RECORD,
    payload: { id: id }
  }
}

export const onSaveMedicalRecordSuccess = id => {
  return {
    type: SAVE_MEDICAL_RECORD_SUCCESS,
    payload: { id: id }
  }
}

export const onSaveMedicalRecordFail = errorMessage => {
  return {
    type: SAVE_MEDICAL_RECORD_FAIL,
    payload: { errorMessage: errorMessage }
  }
}
