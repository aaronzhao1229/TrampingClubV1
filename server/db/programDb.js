const connection = require('./connection')

function createProgram(info, fileName, db = connection) {
  const dataToInsert = {
    programmeCategory: info.catogory,
    fileName: fileName,
    title: info.title,
  }
  return db('programmes').insert(dataToInsert)
}

function updateProgram(newProgramme, db = connection) {
  return db('programmes')
    .update(newProgramme)
    .where('programmeCategory', newProgramme.programmeCategory)
}

function getProgrammeByCategory(category, db = connection) {
  return db('programmes').select().where('programmeCategory', category).first()
}

function getProgramme(db = connection) {
  return db('programmes').select()
}

module.exports = {
  createProgram,
  getProgramme,
  getProgrammeByCategory,
  updateProgram,
}
