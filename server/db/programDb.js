const connection = require('./connection')

function createProgram(info, fileName, db = connection) {
  const dataToInsert = {
    programmeCategory: info.catogory,
    fileName: fileName,
    title: info.title,
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
