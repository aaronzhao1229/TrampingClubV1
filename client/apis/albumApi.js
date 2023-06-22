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
