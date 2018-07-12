import { combineReducers } from "redux-immutable"
import authentication from "./authentication"
import medicalRecord from "./medicalRecord"
import { LOG_OUT } from "../constants/actionTypes"
import storage from "redux-persist/es/storage"

const appReducer = combineReducers({
  authentication,
  medicalRecord
})

export default (state, action) => {
  if (action.type === LOG_OUT) {
    Object.keys(
      state.forEach(key => {
        storage.removeItem(`persist:${key}`)
      })
    )
    window.location.reload()
  }
  return appReducer(state, action)
}
