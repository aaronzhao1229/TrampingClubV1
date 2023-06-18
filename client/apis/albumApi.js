import request from 'superagent'

const rootUrl = '/api/v1'

export function getAlbum() {
  return request.get(rootUrl + '/album').then((res) => {
    return res.body.album
  })
  // .catch((error) => console.log(error))
}
