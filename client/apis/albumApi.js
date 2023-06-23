import request from 'superagent'

const rootUrl = '/api/v1'

export function getAlbum() {
  return request.get(rootUrl + '/album').then((res) => {
    return res.body
  })
  // .catch((error) => console.log(error))
}

export function getPhotosByAlbumId(albumId) {
  return request.get(rootUrl + `/album//getPhotos/${albumId}`).then((res) => {
    return res.body
  })
  // .catch((error) => console.log(error))
}

export function deletePhotoByPhotoId(photoId) {
  return request
    .delete(rootUrl + `/album/deletePhoto/${photoId}`)
    .then((res) => {
      return res.body
    })
  // .catch((error) => console.log(error))
}

export function createAlbum(newAlbum) {
  return request
    .post(rootUrl + '/album/uploadImage')
    .send(newAlbum)
    .then((res) => {
      return res.body
    })
  // .catch((error) => console.log(error))
}

export function deleteAlbumByAlbumId(albumId) {
  return request
    .delete(rootUrl + `/album/deleteAlbum/${albumId}`)
    .then((res) => {
      return res.body
    })
  // .catch((error) => console.log(error))
}
