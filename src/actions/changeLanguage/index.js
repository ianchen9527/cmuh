import { CHANGE_LANGUAGE } from "../../constants/actionTypes";

export const onLanguageChange = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    current: language
  }
}
