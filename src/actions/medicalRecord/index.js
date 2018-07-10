import {
  CREATE_MEDICAL_RECORD,
  CREATE_MEDICAL_RECORD_SUCCESS,
  CREATE_MEDICAL_RECORD_FAIL
} from "../../constants/actionTypes"

export const onCreateMedicalRecord = id => {
  return {
    type: CREATE_MEDICAL_RECORD,
    payload: { id: id }
  }
}

export const onCreateMedicalRecordSuccess = id => {
  return {
    type: CREATE_MEDICAL_RECORD_SUCCESS,
    payload: { id: id }
  }
}

export const onCreateMedicalRecordFail = errorMessage => {
  return {
    type: CREATE_MEDICAL_RECORD_FAIL,
    payload: { errorMessage: errorMessage }
  }
}
