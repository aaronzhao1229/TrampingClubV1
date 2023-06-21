const express = require('express')
const multer = require('multer')

const crypto = require('crypto')
const { uploadImageToS3, getImageFromS3, deleteImageFromS3 } = require('../s3')
const db = require('../db/albumDb')

const router = express.Router()

const randomImageName = (bites = 32) =>
  crypto.randomBytes(bites).toString('hex')
const storage = multer.memoryStorage() //create a memory storage
const upload = multer({ storage: storage })

router.post('/uploadImage', upload.array('image'), async (req, res) => {
  const imageNames = []
  for (let i = 0; i < req.files.length; i++) {
    let imageName = randomImageName()
    await uploadImageToS3(imageName, req.files[i])
    imageNames.push(imageName)
  }

  db.createPhotos(imageNames)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/getPhotos/:albumId', async (req, res) => {
  const albumId = req.params.albumId
  const imageNames = await db.getPhotosByAlbumId(albumId)

  if (imageNames.length === 0) {
    res.status(404).send('Image not found')
    return
  }
  const url = []
  for (let i = 0; i < imageNames.length; i++) {
    let imageName = await getImageFromS3(imageNames[i])
    url.push(imageName)
  }
  res.json(url)
})

router.delete('/deletePhoto/:photoId', async (req, res) => {
  const photoId = req.params.photoId
  const imageName = await db.getPhotoByPhotoId(photoId)

  if (imageName.length === 0) {
    res.status(404).send('Image not found')
    return
  }
  try {
    await deleteImageFromS3(imageName)
    await db.deletePhoto(photoId)
    res.send(imageName)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

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
