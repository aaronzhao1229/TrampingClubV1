const express = require('express')
const multer = require('multer')
// const {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
//   DeleteObjectCommand,
// } = require('@aws-sdk/client-s3')
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

// require('dotenv').config()
const crypto = require('crypto')
const { uploadImageToS3, getImageFromS3, deleteImageFromS3 } = require('../s3')
const db = require('../db/albumDb')

const router = express.Router()

const randomImageName = (bites = 32) =>
  crypto.randomBytes(bites).toString('hex')
const storage = multer.memoryStorage() //create a memory storage
const upload = multer({ storage: storage })

// const bucketName = process.env.BUCKET_NAME
// const bucketRegion = process.env.BUCKET_REGION
// const accessKey = process.env.SES_AccessKey
// const secretAccessKey = process.env.SES_SecretAccessKey

// const awsConfig = {
//   region: bucketRegion,
//   credentials: {
//     accessKeyId: accessKey,
//     secretAccessKey: secretAccessKey,
//   },
// }

// const s3 = new S3Client(awsConfig)

router.post('/uploadImage', upload.single('image'), async (req, res) => {
  // console.log('req.file', req.file)
  // console.log(req.file.buffer) // the image we need to send to S3
  const imageName = randomImageName()

  await uploadImageToS3(imageName, req.file)

  db.createPhotos({ photoName: imageName })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/getPhotos', async (req, res) => {
  const imageName = await db.getPhotos(7)
  if (imageName.length === 0) {
    res.status(404).send('Image not found')
    return
  }
  console.log(imageName)

  const url = await getImageFromS3(imageName)

  res.json(url)
})

router.delete('/deletePhoto/:photoId', async (req, res) => {
  const photoId = req.params.photoId
  const imageName = await db.getPhotos(photoId)

  if (imageName.length === 0) {
    res.status(404).send('Image not found')
    return
  }
  await deleteImageFromS3(imageName)
  await db.deletePhoto(photoId)
  res.send(imageName)
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
