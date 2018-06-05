'use strict'

const baseUrl = process.env.API_URL || 's://pipeb.in'

exports.apiUrl = `http${baseUrl}`
exports.wsUrl = `ws${baseUrl}`
