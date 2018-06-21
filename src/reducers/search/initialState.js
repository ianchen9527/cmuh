import Immutable from "immutable"

export const initialState = Immutable.fromJS({
  key: "",
  result: {
    articles: [],
    magazines: []
  }
})
