'use strict'

const { readFileSync, writeFileSync, existsSync } = require('fs')
const { join } = require('path')
const configPath = join(process.env.HOME, '.pipebin.conf.json')

exports.writeConfig = function (conf) {
  const output = JSON.stringify(conf, null, 2)
  writeFileSync(configPath, output)
}

exports.readConfig = function () {
  if (!existsSync(configPath)) { return null }
  const conf = readFileSync(configPath)
  return JSON.parse(conf)
}
