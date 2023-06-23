const connection = require('./connection')

function createProgram(catogory, fileName, db = connection) {
  const dataToInsert = {
    programmeCategory: catogory,
    fileName: fileName,
  }
  return db('programmes').insert(dataToInsert)
}

module.exports = {
  createProgram,
}
