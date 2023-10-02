const connection = require('./connection')

function getVideos(db = connection) {
  return db('videos').select()
}

function createVideo(videoInfo, db = connection) {
  return db('videos').insert(videoInfo)
}

function deleteVideo(videoId, db = connection) {
  return db('videos').delete().where('videoId', videoId)
}

function editVideo(editedVideo, db = connection) {
  return db('videos').update(editedVideo).where('videoId', editedVideo.videoId)
}

module.exports = {
  getVideos,
  createVideo,
  deleteVideo,
  editVideo,
}
