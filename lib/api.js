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

async function send (method, endpoint, payload, useAuth = true) {
  const auth = useAuth ? readConfig() : undefined
  const options = getOptions(method, payload, auth)
  const url = getUrl(method, endpoint, auth)
  const response = await fetch(url, options)
  return response.ok ? response.json() : undefined
}

exports.get = async function (endpoint, useAuth) {
  return send('get', endpoint, null, useAuth)
}

exports.post = async function (endpoint, payload, useAuth) {
  return send('post', endpoint, payload, useAuth)
}

exports.remove = async function (endpoint, useAuth) {
  return send('delete', endpoint, null, useAuth)
}
