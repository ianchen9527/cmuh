import { combineReducers } from "redux-immutable"
import authentication from "./authentication"
import language from "./language"
import state from "./state"
import libraries from "./libraries"
import updatedAt from "./updatedAt"
import search from "./search"

export default combineReducers({
  updatedAt,
  authentication,
  language,
  state,
  libraries,
  search
})
