#!/bin/env node

'use strict'

const yargs = require('yargs')
const { get } = require('./get')
const { set } = require('./set')

const argv = yargs
  .option('')
  .argv

async function init (bare) {
  if (!bare.length) {
    return await set(process.stdin)
  }

  if (bare.length === 1) {
    return await get(bare[0])
  }
}

init (argv['_'])