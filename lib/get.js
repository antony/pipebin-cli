'use strict'

const fetch = require('node-fetch')
const { apiUrl } = require('./constants')

exports.get = async function (id) {
  const response = await fetch(`${apiUrl}/api/v1/pipe/${id}`, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
    const { pipe } = await response.json()
    console.log(pipe)
}
