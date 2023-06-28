const connection = require('./connection')

function getUsers(db = connection) {
  return db('user').select()
}
function createUser(newUser, db = connection) {
  return db('user')
    .insert(newUser)
    .then(() => db('user').select())
}
function saveToken(username, refreshToken, db = connection) {
  return db('user')
    .update('refreshToken', refreshToken)
    .where('username', username)
}

function deleteToken(username, db = connection) {
  return db('user').update('refreshToken', null).where('username', username)
}

module.exports = {
  getUsers,
  createUser,
  saveToken,
  deleteToken,
}
