'use strict'

const WebSocket = require('ws')
const Spinner = require('ora')
const { wsUrl } = require('./constants')

exports.awaitLogin = function (email) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    let spinner = new Spinner()

    ws.on('open', () => {
      spinner.start('Waiting for email confirmation...')
      ws.send(JSON.stringify({ command: 'login-wait', email }))
    })

    ws.on('message', data => {
      const { reply, token } = JSON.parse(data)
      if (reply === 'login-wait') {
        spinner.succeed('Got email confirmation. You are logged in.')
        // write session
        return resolve(token)
      }
    })
  })
}
