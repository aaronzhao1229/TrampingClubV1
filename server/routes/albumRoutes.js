const express = require('express')
const multer = require('multer')
const verifyJWT = require('../middleware/verifyJWT')
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
  const newAlbum = {
    albumName: req.body.albumName,
    tripDate: req.body.tripDate,
  }

  db.createPhotos(newAlbum, imageNames)
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
  const images = await db.getPhotosByAlbumId(albumId)

  if (images.length === 0) {
    res.status(404).send('Image not found')
    return
  }
  const photos = []
  for (let i = 0; i < images.length; i++) {
    let imageUrl = await getImageFromS3(images[i].photoName)
    photos.push({ photoId: images[i].photoId, url: imageUrl })
  }
  res.json(photos)
})

router.delete('/deletePhoto/:photoId', async (req, res) => {
  const photoId = req.params.photoId
  const imageName = await db.getPhotoByPhotoId(photoId)

  if (imageName.length === 0) {
    res.status(404).send('Image not found')
    return
  }
  try {
    await deleteImageFromS3(imageName[0].photoName)
    await db.deletePhotoByPhotoId(photoId)
    res.send(imageName)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/deleteAlbum/:albumId', async (req, res) => {
  const albumId = req.params.albumId
  const album = await db.getAlbumByAlbumId(albumId)

  if (album.length === 0) {
    res.status(404).send('Album not found')
    return
  }
  const photos = await db.getPhotosByAlbumId(albumId)
  if (photos.length !== 0) {
    try {
      for (let i = 0; i < photos.length; i++) {
        await deleteImageFromS3(photos[i].photoName)
      }
      await db.deleteAlbumByAlbumId(albumId)
      res.send(album[0].albumName + ' has been deleted.')
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  } else {
    try {
      await db.deleteAlbumByAlbumId(albumId)
      res.send(album[0].albumName + ' has been deleted.')
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
})

router.patch('/editAlbum/:albumId', (req, res) => {
  const album = req.body
  const editedAlbum = {
    albumId: req.params.albumId,
    albumName: album.tripName,
    tripDate: album.tripDate,
  }

  db.editAlbum(editedAlbum)
    .then(() => {
      return res.json('album has been updated')
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/', verifyJWT, async (req, res) => {
  try {
    const album = await db.getAlbum()
 
    for (let i = 0; i < album.length; i++) {
      let url = await getImageFromS3(album[i].photoName)
      album[i].photoUrl = url
    }
    res.json(album)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
