import Base64 from "crypto-js/enc-base64"
import Utf8 from "crypto-js/enc-utf8"

export default function parseToken(token: string) {
  try {
    var payloadString = token.split('.')[1]
    var words = Base64.parse(payloadString)
    var wordsString = words.toString(Utf8)
    var payload = JSON.parse(wordsString)
    return payload
  } catch (e) {
    return {}
  }
}