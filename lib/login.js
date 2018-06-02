'use strict'

const fetch = require('node-fetch')
const inquirer = require('inquirer')
const pkg = require('../package.json')
const { apiUrl } = require('./constants')
const { awaitLogin } = require('./socket')

const questions = [{
  type: 'input',
  name: 'email',
  message: 'Enter your email'
}]

exports.login = async function () {
  const { email } = await inquirer.prompt(questions)

  const options = {
    method: 'post',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      email,
      client: `cli/v${pkg.version}`
    })
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/session`, options)
    const { mnemonic } = await response.json()
    console.info(`Check your email, ensure it contains the phrase "${mnemonic}", and click the link to log in.`)
    await awaitLogin(email)
  } catch (e) {
    console.error('An error ocurred logging you in:', e.message)
  }
}
