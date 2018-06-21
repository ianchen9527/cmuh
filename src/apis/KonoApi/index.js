class KonoApi {
  constructor(subUrl = "") {
    this.baseUrl = ""
    this.subUrl = subUrl
    this.call = this.call.bind(this)
  }

  get url() {
    return this.baseUrl + this.subUrl
  }

  call() {}
}

export default KonoApi
