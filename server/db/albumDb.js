const connection = require('./connection')

function getAlbum(db = connection) {
  return db('album')
    .join('photos', function () {
      this.on('photos.albumId', '=', 'album.albumId').andOn(
        'photos.photoId',
        '=',
        db.raw(
          '(select max(photoId) from photos where photos.albumId = album .albumId)'
        )
      )
    })

    .select()
}

async function createPhotos(newAlbum, imageNames, db = connection) {
  const newAlbumId = await db('album').insert({
    albumName: newAlbum.albumName,
    tripDate: newAlbum.tripDate,
  })

  const namesToInsert = imageNames.map((imageName) => ({
    photoName: imageName,
    albumId: newAlbumId[0],
  }))
  return db('photos').insert(namesToInsert)
}

function getPhotosByAlbumId(albumId, db = connection) {
  return db('photos').select('photoId', 'photoName').where('albumId', albumId)
}

function getPhotoByPhotoId(photoId, db = connection) {
  return db('photos').select('photoName').where('photoId', photoId)
}

function deletePhotoByPhotoId(id, db = connection) {
  return db('photos').delete().where('photoId', id)
}

module.exports = {
  getAlbum,
  createPhotos,
  getPhotosByAlbumId,
  getPhotoByPhotoId,
  deletePhotoByPhotoId,
}
