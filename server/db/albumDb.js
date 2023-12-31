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

function addMorePhotos(albumId, imageNames, db = connection) {
  const namesToInsert = imageNames.map((imageName) => ({
    photoName: imageName,
    albumId: albumId,
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

function getAlbumByAlbumId(albumId, db = connection) {
  return db('album').select().where('albumId', albumId)
}
function deleteAlbumByAlbumId(albumId, db = connection) {
  return db('photos')
    .delete()
    .where('albumId', albumId)
    .then(() => db('album').delete().where('albumId', albumId))
}

function editAlbum(editedAlbum, db = connection) {
  return db('album').update(editedAlbum).where('albumId', editedAlbum.albumId)
}

module.exports = {
  getAlbum,
  createPhotos,
  addMorePhotos,
  getPhotosByAlbumId,
  getPhotoByPhotoId,
  deletePhotoByPhotoId,
  deleteAlbumByAlbumId,
  getAlbumByAlbumId,
  editAlbum,
}
