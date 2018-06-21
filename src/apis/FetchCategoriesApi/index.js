import axios from "axios"
import KonoApi from "../KonoApi"

class FetchCategoriesApi extends KonoApi {
  constructor(data) {
    super(`/categories?lib=${data.libraryName}`)
  }

  call() {
    return axios.get(this.url)
  }
}

export default FetchCategoriesApi
