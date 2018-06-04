'use strict'

const fetch = require('node-fetch')
const { readConfig } = require('./config')
const { apiUrl } = require('./constants')

function canHaveBody (method) {
  return ['put', 'post'].includes(method)
}

function getUrl (method, endpoint, auth) {
  const url = `${apiUrl}${endpoint}`
  const appendAuthToUrl = auth && !canHaveBody(method)
  return appendAuthToUrl ? `${url}?email=${auth.email}&token=${auth.token}` : url
}

function getOptions (method, payload, auth) {
  const options = {
    method,
    headers: {
      'accept': 'application/json',
      'content-type': 'text/plain'
    }
  }

  const body = auth ? Object.assign({}, payload, auth) : payload

  if (canHaveBody(method)) {
    options.body = JSON.stringify(body)
  }

  return options
}

async function send (method, endpoint, payload) {
  const auth = readConfig()
  const options = getOptions(method, payload, auth)
  const url = getUrl(method, endpoint, auth)
  const response = await fetch(url, options)
  return response.ok ? response.json() : undefined
}

exports.get = async function (endpoint) {
  return send('get', endpoint)
}

exports.post = async function (endpoint, payload) {
  return send('post', endpoint, payload)
}

exports.remove = async function (endpoint) {
  return send('delete', endpoint)
}
