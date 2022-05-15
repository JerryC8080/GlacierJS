'use strict'
const defaultFS = require('fs')
const pathTemp = require('path-temp')

module.exports = async (dir, customFS) => {
  const fs = customFS || defaultFS
  const tempFile = pathTemp(dir)
  try {
    await fs.promises.writeFile(tempFile, '', 'utf8')
    fs.promises.unlink(tempFile).catch(() => {})
    return true
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'EPERM' || err.code === 'EROFS') {
      return false
    }
    throw err
  }
}

module.exports.sync = (dir, customFS) => {
  const fs = customFS || defaultFS
  const tempFile = pathTemp(dir)
  try {
    fs.writeFileSync(tempFile, '', 'utf8')
    fs.unlinkSync(tempFile)
    return true
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'EPERM' || err.code === 'EROFS') {
      return false
    }
    throw err
  }
}
