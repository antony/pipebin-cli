'use strict'

const inquirer = require('inquirer')
const pkg = require('../../package.json')
const { apiUrl } = require('../constants')
const { awaitLogin } = require('../socket')
const { writeConfig, readConfig } = require('../config')
const api = require('../api')

exports.login = async function () {
  const conf = readConfig()
  const { email } = await inquirer.prompt([{
    type: 'input',
    name: 'email',
    message: 'Enter your email',
    default: conf && conf.email
  }])

  try {
    const payload = {
      email,
      client: `cli/v${pkg.version}`
    }

    const { mnemonic } = await api.post('/api/v1/session', payload, false)
    console.info(`Check your email, ensure it contains the phrase "${mnemonic}", and click the link to log in.`)
    const token = await awaitLogin(email)
    writeConfig({ email, token })
  } catch (e) {
    console.error('An error ocurred logging you in:', e.message)
  }
}
