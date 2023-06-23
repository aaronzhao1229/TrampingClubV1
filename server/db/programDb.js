const connection = require('./connection')

function createProgram(catogory, fileName, db = connection) {
  const dataToInsert = {
    programmeCategory: catogory,
    fileName: fileName,
  }
  return db('programmes').insert(dataToInsert)
}

function getProgramme(db = connection) {
  return db('programmes').select()
}

module.exports = {
  createProgram,
  getProgramme,
}
