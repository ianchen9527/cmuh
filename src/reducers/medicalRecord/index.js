import {
  SAVE_MEDICAL_RECORD,
  SAVE_MEDICAL_RECORD_SUCCESS,
  SAVE_MEDICAL_RECORD_FAIL
} from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"

const reducerMap = new Map([
  [
    SAVE_MEDICAL_RECORD,
    state => {
      return state.set("isLoading", true).set("errorMessage", "")
    }
  ],
  [
    SAVE_MEDICAL_RECORD_SUCCESS,
    (state, action) => {
      return state.set("id", action.payload.id).set("isLoading", false)
    }
  ],
  [
    SAVE_MEDICAL_RECORD_FAIL,
    (state, action) => {
      return state
        .set("errorMessage", action.payload.message)
        .set("isLoading", false)
    }
  ]
])

const medicalRecord = handleActions(reducerMap, initialState)
export default medicalRecord
