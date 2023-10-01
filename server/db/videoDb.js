const connection = require('./connection')

function getVideos(db = connection) {
  return db('videos').select()
}

function createVideo(videoInfo, db = connection) {
  return db('videos').insert(videoInfo)
}

module.exports = {
  getVideos,
  createVideo,
}
