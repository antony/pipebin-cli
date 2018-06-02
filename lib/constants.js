'use strict'

exports.apiUrl = buildUrl('http')
exports.wsUrl = buildUrl('ws')

function buildUrl (prefix) {
  const apiUrl = process.env.API_URL || 'pipeb.in'
  const suffix = process.env.API_SECURE === 'true' ? 's' : ''

  return `${prefix}${suffix}://${apiUrl}`
}
