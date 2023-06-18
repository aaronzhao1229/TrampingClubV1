const connection = require('./connection')

function getAlbum(db = connection) {
  return db('album').join('photos', 'album.albumId', 'photos.albumId').select()
}

module.exports = {
  getAlbum,
}
