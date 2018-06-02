'use strict'

const WebSocket = require('ws')
const Spinner = require('ora')
const { wsUrl } = require('./constants')

exports.awaitLogin = function (email) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`${wsUrl}/ws`)
    let spinner = new Spinner()

    ws.on('open', () => {
      spinner.start('Waiting for email confirmation...')
      ws.send({ command: 'login-wait', email })
    })

    ws.on('message', data => {
      const { reply, token } = JSON.parse(data)
      if (reply === 'login-wait') {
        spinner.start('Got email confirmation...')
        return resolve(token)
      }
    })
  })
}
