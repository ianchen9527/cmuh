import { ZH_HANT, ZH_HANS } from "../../../../../../../constants/languages"
import zhHantDictionary from "./zhHant"
import zhHansDictionary from "./zhHans"

let dictionaries = {}

dictionaries[ZH_HANT] = zhHantDictionary
dictionaries[ZH_HANS] = zhHansDictionary

export default dictionaries
