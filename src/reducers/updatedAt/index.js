import { REQUEST_CATEGORIES_SUCCESS } from "../../constants/actionTypes"
import { handleActions } from "redux-actions"
import { initialState } from "./initialState"
import { fromJS } from "immutable"
import { getNow } from "../../utilities/time"

const reducerMap = new Map([
  [
    REQUEST_CATEGORIES_SUCCESS,
    (state, action) => {
      return state.setIn(
        ["libraries", action.payload.libraryName],
        fromJS({ categories: getNow() })
      )
    }
  ]
])

export default handleActions(reducerMap, initialState)
