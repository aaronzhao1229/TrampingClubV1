const express = require('express')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const db = require('../db/userDb')
const jwt = require('jsonwebtoken')
const { sendEmailForgetPassword } = require('../ses')

require('dotenv').config()
const router = express.Router()

router.post('/createUser', async (req, res) => {
  const { username, password, email } = req.body
  if (!username || !password || !email)
    return res.status(400).send('Username, password and email are required.')

  const existingUsers = await db.getUsers()
  const duplicateUsername = existingUsers.find(
    (person) => person.username === username
  )
  const duplicateEmail = existingUsers.find((person) => person.email === email)

  if (duplicateUsername || duplicateEmail) return res.sendStatus(409) // conflict

  try {
    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10)
    let newUser = {}
    if (username === 'lambdaAdmin') {
      newUser = {
        username: username,
        password: hashedPassword,
        email: email,
        roles: ['admin', 'member'],
      }
    } else {
      newUser = {
        username: username,
        password: hashedPassword,
        email: email,
        roles: ['member'],
      }
    }
    await db.createUser(newUser)

    res.status(201).send(`New user ${username} created!`)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Something went wrong')
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' })

  const existingUsers = await db.getUsers()
  const foundUser = existingUsers.find((person) => person.username === username)

  if (!foundUser) return res.sendStatus(401) // Unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password)

  if (match) {
    // create JWT
    const userRolesObject = await db.getUserRolesByUserId(foundUser.id)
    const userRoles = userRolesObject.map((role) => role.role)

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: userRoles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    )
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '15m' }
    )
    // save refresh token to database
    await db.saveToken(foundUser.username, refreshToken)
    // send refreshToken with httpOnly cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    // send accessToken with json which front end developer can get
    res.json({ accessToken, userRoles })
  } else {
    res.sendStatus(401)
  }
})

router.get('/refresh', async (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.sendStatus(401)

  const refreshToken = cookies.jwt

  const existingUsers = await db.getUsers()

  const foundUser = existingUsers.find(
    (person) => person.refreshToken === refreshToken
  )

  if (!foundUser) return res.sendStatus(403) // Forbidden

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403)
      const username = decoded.username
      const userRolesObject = await db.getUserRolesByUserId(foundUser.id)
      const userRoles = userRolesObject.map((role) => role.role)
      const accessToken = jwt.sign(
        { UserInfo: { username: decoded.username, roles: userRoles } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      )

      res.json({ accessToken, userRoles, username })
    }
  )
})

router.get('/logout', async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  const refreshToken = cookies.jwt
  const existingUsers = await db.getUsers()

  const foundUser = existingUsers.find(
    (person) => person.refreshToken === refreshToken
  )

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    return res.sendStatus(204)
  }

  // delete refreshToken in db
  await db.deleteToken(foundUser.username)
  res.clearCookie('jwt', { httpOnly: true }) // add this flag in production mode, secure: true - only serves on https
  res.sendStatus(204)
})

router.post('/forgetPassword', async (req, res) => {
  // find email address

  const foundUser = await db.getUserByEmail(req.body.email)

  if (!foundUser) return res.sendStatus(404)

  let resetToken = crypto.randomBytes(32).toString('hex')

  const hash = await bcrypt.hash(resetToken, 10)
  // save the token and dateNow to DB

  try {
    await db.saveResetPasswordToken(req.body.email, hash)
    await sendEmailForgetPassword(req.body.email, resetToken)

    res.send('Email sent')
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'internal server error' })
  }
})

router.post('/resetPassword', async (req, res) => {
  const { email, password, token } = req.body
  const tokenInDb = await db.findResetTokenByEmail(email)

  if (!tokenInDb) return res.sendStatus(404)

  if (tokenInDb.resetDate + 3600 * 1000 * 0.5 < Date.now())
    return res.sendStatus(498)
  // await sendEmailForgetPassword(req.body.email, resetToken)
  const isValid = await bcrypt.compare(token, tokenInDb.resetPasswordToken)

  if (!isValid) return res.sendStatus(498)

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.resetPassword(email, hashedPassword)

    res.send('password reset')
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
