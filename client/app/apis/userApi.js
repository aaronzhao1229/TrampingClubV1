import request from 'superagent'

const rootUrl = '/api/v1'

export function login(userInfo) {
  return request
    .post(rootUrl + '/user/login')
    .send(userInfo)
    .then((res) => {
      return res.body
    })
}

export function refreshAuth() {
  return request
    .get(rootUrl + '/user/refresh')
    .withCredentials()
    .then((res) => {
      return res.body
    })
}
