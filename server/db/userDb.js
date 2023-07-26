const connection = require('./connection')

function getUsers(db = connection) {
  return db('user').select()
}

function getUserRolesByUserId(userId, db = connection) {
  return db('userRoles').select('role').where('userId', userId)
}
function createUser(newUser, db = connection) {
  return db('user')
    .insert({
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
    })
    .then((newId) => createRolesByUserId(newUser.roles, newId[0]))
}

function saveToken(username, refreshToken, db = connection) {
  return db('user')
    .update('refreshToken', refreshToken)
    .where('username', username)
}

function deleteToken(username, db = connection) {
  return db('user').update('refreshToken', null).where('username', username)
}

function createRolesByUserId(roles, userId, db = connection) {
  const dataToInsert = []

  roles.map((role) => {
    dataToInsert.push({ role: role, userId: userId })
  })
  return db('userRoles').insert(dataToInsert)
}

function saveResetPasswordToken(email, resetPasswordToken, db = connection) {
  return db('user')
    .update({ resetPasswordToken: resetPasswordToken, resetDate: Date.now() })
    .where('email', email)
}

module.exports = {
  getUsers,
  getUserRolesByUserId,
  createUser,
  saveToken,
  deleteToken,
  saveResetPasswordToken,
}
