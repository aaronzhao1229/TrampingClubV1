const express = require('express')
const multer = require('multer')

const crypto = require('crypto')
const { uploadImageToS3, getImageFromS3, deleteImageFromS3 } = require('../s3')
const db = require('../db/programDb')

const router = express.Router()

const randomImageName = (bites = 32) =>
  crypto.randomBytes(bites).toString('hex')
const storage = multer.memoryStorage() //create a memory storage
const upload = multer({ storage: storage })

router.post('/uploadProgramme', upload.single('file'), async (req, res) => {
  let fileName = randomImageName()
  await uploadImageToS3(fileName, req.file)

  db.createProgram(req.body.category, fileName)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
