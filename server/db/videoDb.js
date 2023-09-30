const connection = require('./connection')

function getVideos(db = connection) {
  return db('videos').select()
}

module.exports = {
  getVideos,
}
