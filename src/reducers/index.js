import { combineReducers } from "redux-immutable"
import authentication from "./authentication"
import medicalRecord from "./medicalRecord"

export default combineReducers({
  authentication,
  medicalRecord
})
