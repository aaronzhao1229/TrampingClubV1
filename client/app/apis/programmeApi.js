import request from 'superagent'

const rootUrl = '/api/v1'

export function getProgrammes() {
  return request.get(rootUrl + '/programme').then((res) => {
    return res.body
  })
}

export function updateProgramme(newProgramme) {
  return request
    .post(rootUrl + '/programme/updateProgramme')
    .send(newProgramme)
    .then((res) => {
      return res.body
    })
}
