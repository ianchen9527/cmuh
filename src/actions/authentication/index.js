import { LOG_IN, LOG_OUT, LOG_IN_SUCCESS } from "../../constants/actionTypes"

export const onLogIn = () => {
  return {
    type: LOG_IN
  }
}

export const onLogOut = () => ({
  type: LOG_OUT
})

export const onLogInSuccess = () => ({
  type: LOG_IN_SUCCESS
})
