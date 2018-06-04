'use strict'

const api = require('../api')
const { readConfig } = require('../config')

const buffers = []
let inputLength = 0

exports.set = async function (input) {
  input.resume()
  input.setEncoding('utf8')

  input.on('data', chunk => {
    inputLength += chunk.length
    buffers.push(Buffer.from(chunk))
  })

  input.on('end', async () => {
    const content = Buffer.concat(buffers, inputLength)
    const auth = readConfig()

    const { id } = await api.post('/api/v1/pipe', {
      content,
      private: !!auth
    })
    console.log(id)
  })
}
