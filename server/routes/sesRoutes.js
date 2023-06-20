const express = require('express')

const sendEmail = require('../ses')

const router = express.Router()

router.post('/sendEmail', (req, res) => {
  console.log(req.body)
  sendEmail(req.body)
  res.send('Email sent')
})

module.exports = router
