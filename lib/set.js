'use strict'

const fetch = require('node-fetch')
const { apiUrl } = require('./constants')

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
    const response = await fetch(`${apiUrl}/api/v1/pipe`, {
      method: 'post',
      headers: {
        'accept': 'application/json',
        'content-type': 'text/plain'
      },
      body: content
    })
    const { id } = await response.json()
    console.log(id)
  })
}
