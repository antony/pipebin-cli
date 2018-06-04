#!/usr/bin/env node

'use strict'

const yargs = require('yargs')
const { get } = require('./commands/get')
const { set } = require('./commands/set')
const { login } = require('./commands/login')
const { rm } = require('./commands/rm')

const argv = yargs
  .option('')
  .argv

function mapCommand (argument) {
  return {
    login,
    rm
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
