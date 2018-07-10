import {
  CREATE_MEDICAL_RECORD,
  CREATE_MEDICAL_RECORD_SUCCESS,
  CREATE_MEDICAL_RECORD_FAIL
} from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"

const reducerMap = new Map([
  [
    CREATE_MEDICAL_RECORD,
    state => {
      return state.set("isLoading", true).set("errorMessage", "")
    }
  ],
  [
    CREATE_MEDICAL_RECORD_SUCCESS,
    (state, action) => {
      return state.set("id", action.payload.id).set("isLoading", false)
    }
  ],
  [
    CREATE_MEDICAL_RECORD_FAIL,
    (state, action) => {
      return state
        .set("errorMessage", action.payload.message)
        .set("isLoading", false)
    }
  ]
])

const medicalRecord = handleActions(reducerMap, initialState)
export default medicalRecord
