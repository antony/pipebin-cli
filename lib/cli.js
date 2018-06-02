#!/usr/bin/env node

'use strict'

const yargs = require('yargs')
const { get } = require('./get')
const { set } = require('./set')
const { login } = require('./login')

const argv = yargs
  .option('')
  .argv

function mapCommand (argument) {
  return {
    login
  }[argument] || get
}

async function init (passed) {
  const params = passed['_']
  if (!params.length) {
    return set(process.stdin)
  }

  const firstArgument = params[0]
  const command = mapCommand(firstArgument)
  command(argv)
}

init(argv)
