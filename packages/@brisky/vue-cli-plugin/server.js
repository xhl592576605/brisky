
const path = require('path')
const fs = require("fs")
module.exports = (app, server, compiler) => {
  app.all('*', (incomingMessage, serverResponse, next) => {
    const url = incomingMessage.url
    const domain = url.split('?')[0]
    const params = url.split('?')[1]
    const method = incomingMessage.method

    const jsonPath = path.join('mock', domain, `${method}${params ? `@${params.replace('&debug=true', '')}` : ''}.json`)
    let error
    let jsonObject
    try {
      jsonObject = fs.readFileSync(jsonPath, "utf-8")
    } catch (e) {
      error = e
    }
    if (jsonObject && !error) {
      try {
        jsonObject = JSON.parse(jsonObject)
      } catch (e) {
        error = e
      }
    }

    error && "ENOENT" !== error.code && serverResponse.append("X-Mocked-By", "brisky").status(500).json({
      error: error.message,
      stack: error.stack,
      timestamp: new Date
    })
    !error && jsonObject && serverResponse.append("X-Mocked-By", "brisky").status(200).json(jsonObject)
    next()
  })
}