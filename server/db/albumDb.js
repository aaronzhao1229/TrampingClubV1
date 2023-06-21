const connection = require('./connection')

function getAlbum(db = connection) {
  return db('album').join('photos', 'album.albumId', 'photos.albumId').select()
}

function createPhotos(photo, db = connection) {
  return db('photos').insert({
    photoName: photo.photoName,
    albumId: 1,
  })
}

function getPhotos(id, db = connection) {
  return db('photos').select('photoName').where('photoId', id)
}

function deletePhoto(id, db = connection) {
  return db('photos').delete().where('photoId', id)
}

module.exports = {
  getAlbum,
  createPhotos,
  getPhotos,
  deletePhoto,
}
