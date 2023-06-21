const connection = require('./connection')

function getAlbum(db = connection) {
  return db('album').join('photos', 'album.albumId', 'photos.albumId').select()
}

function createPhotos(imageNames, db = connection) {
  const namesToInsert = imageNames.map((imageName) => ({
    photoName: imageName,
    albumId: 1,
  }))
  return db('photos').insert(namesToInsert)
}

function getPhotosByAlbumId(albumId, db = connection) {
  return db('photos').select('photoName').where('albumId', albumId)
}

function getPhotoByPhotoId(photoId, db = connection) {
  return db('photos').select('photoName').where('photoId', photoId)
}

function deletePhoto(id, db = connection) {
  return db('photos').delete().where('photoId', id)
}

module.exports = {
  getAlbum,
  createPhotos,
  getPhotosByAlbumId,
  getPhotoByPhotoId,
  deletePhoto,
}
