const express = require('express')

const db = require('../db/albumDb')

const router = express.Router()

router.get('/', (req, res) => {
  db.getAlbum()
    .then((results) => {
      res.json({ album: results })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
