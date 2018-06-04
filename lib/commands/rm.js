'use strict'

const api = require('../api')

exports.get = async function (passed) {
  const id = passed['_'][0]
  await api.remove(`/api/v1/pipe/${id}`)

  return id
}
