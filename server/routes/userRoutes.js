const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db/userDb')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const router = express.Router()

router.post('/createUser', async (req, res) => {
  const { username, password, email } = req.body
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: 'Username, password and email are required.' })

  const existingUsers = await db.getUsers()
  const duplicateUsername = existingUsers.find(
    (person) => person.username === username
  )
  const duplicateEmail = existingUsers.find((person) => person.email === email)

  if (duplicateUsername || duplicateEmail) return res.sendStatus(409) // conflict

  try {
    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.createUser({
      username: username,
      password: hashedPassword,
      email: email,
    })

    res.status(201).json({ success: `New user ${username} created!` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
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
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
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
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
})

router.get('/refresh', async (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.sendStatus(401)
  // console.log(cookies.jwt)
  const refreshToken = cookies.jwt

  const existingUsers = await db.getUsers()

  const foundUser = existingUsers.find(
    (person) => person.refreshToken === refreshToken
  )

  if (!foundUser) return res.sendStatus(403) // Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403)
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15s' }
    )

    res.json({ accessToken })
  })
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

module.exports = router
