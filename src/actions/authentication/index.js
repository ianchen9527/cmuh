import {
  LOG_IN,
  LOG_OUT,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS
} from "../../constants/actionTypes"

export const onLogIn = (email, password) => {
  return {
    type: LOG_IN,
    payload: { email: email, password: password }
  }
}

export const onLogOut = () => ({
  type: LOG_OUT
})

export const onLogInSuccess = () => ({
  type: LOG_IN_SUCCESS
})

export const onLogOutSuccess = () => ({
  type: LOG_OUT_SUCCESS
})

export const onLogInFail = message => {
  return {
    type: LOG_IN,
    payload: { message: message }
  }
}
