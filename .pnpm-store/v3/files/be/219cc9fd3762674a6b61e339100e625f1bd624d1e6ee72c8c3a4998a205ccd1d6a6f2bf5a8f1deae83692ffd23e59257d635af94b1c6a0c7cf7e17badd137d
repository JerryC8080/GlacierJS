'use strict'
const os = require('os')
const path = require('path')

module.exports = function (filepath, cwd) {
  const home = getHomedir()

  if (isHomepath(filepath)) {
    return path.join(home, filepath.substr(2))
  }
  if (path.isAbsolute(filepath)) {
    return filepath
  }
  if (cwd) {
    return path.join(cwd, filepath)
  }
  return path.resolve(filepath)
}

function getHomedir () {
  const home = os.homedir()
  if (!home) throw new Error('Could not find the homedir')
  return home
}

function isHomepath (filepath) {
  return filepath.indexOf('~/') === 0 || filepath.indexOf('~\\') === 0
}
