const express = require('express')

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

router.post('/create', async (req, res) => {
  const videoInfo = req.body
  try {
    const result = await db.createVideo(videoInfo)
    res.json(result)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
