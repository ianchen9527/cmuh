import { REQUEST_CATEGORIES_SUCCESS } from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"
import { fromJS } from "immutable"

const reducerMap = new Map([
  [
    REQUEST_CATEGORIES_SUCCESS,
    (state, action) => {
      return state.set(
        action.payload.libraryName,
        fromJS({ categories: action.payload.categories })
      )
    }
  ]
])

export default handleActions(reducerMap, initialState)
