const express = require('express')
const multer = require('multer')
const verifyJWT = require('../middleware/verifyJWT')
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

  db.createProgram(req.body, fileName)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post(
  '/updateProgramme',
  verifyJWT,
  upload.single('file'),
  async (req, res) => {
    let oldProgramme = await db.getProgrammeByCategory(req.body.category)
    if (!oldProgramme) {
      res.status(404).send('programme not found')
    }

    try {
      await deleteImageFromS3(oldProgramme.fileName)
      let newFileName = randomImageName()
      await uploadImageToS3(newFileName, req.file)
      const newProgramme = {
        programmeCategory: req.body.category,
        title: req.body.title,
        fileName: newFileName,
      }
      await db.updateProgram(newProgramme)
      return res.json('Programme has been updated')
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
)

router.get('/', async (req, res) => {
  try {
    const programmes = await db.getProgramme()
    for (let i = 0; i < programmes.length; i++) {
      let url = await getImageFromS3(programmes[i].fileName)
      programmes[i].fileUrl = url
    }
    res.json(programmes)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
