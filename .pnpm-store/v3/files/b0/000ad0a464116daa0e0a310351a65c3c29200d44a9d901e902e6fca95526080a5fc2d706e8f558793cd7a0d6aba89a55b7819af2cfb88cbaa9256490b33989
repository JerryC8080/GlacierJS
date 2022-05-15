const fs = require('fs')

module.exports = async function realpathMissing (path) {
  try {
    return await fs.promises.realpath(path)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return path
    }
    throw err
  }
}

