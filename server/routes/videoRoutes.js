const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const db = require('../db/videoDb')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const videos = await db.getVideos()
    res.json(videos)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/create', verifyJWT, async (req, res) => {
  const videoInfo = req.body
  try {
    const result = await db.createVideo(videoInfo)
    res.json(result)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/delete/:videoId', verifyJWT, async (req, res) => {
  const videoId = req.params.videoId

  try {
    const result = await db.deleteVideo(videoId)
    res.json(result)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/edit/:videoId', verifyJWT, async (req, res) => {
  const editedVideo = {
    videoId: req.params.videoId,
    videoTitle: req.body.videoTitle,
    videoUrl: req.body.videoUrl,
  }
  try {
    const result = await db.editVideo(editedVideo)
    res.json(result)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
