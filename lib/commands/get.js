'use strict'

const api = require('../api')

exports.get = async function (passed) {
  const id = passed['_'][0]
  const response = await api.get(`/api/v1/pipe/${id}`)

  const output = response ? Buffer.from(response.pipe.contents).toString('utf8').trim() : ''
  console.log(output)
}
