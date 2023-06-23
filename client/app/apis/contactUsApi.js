import request from 'superagent'
const rootUrl = '/api/v1'

export function contactUs(message) {
  console.log(message)
  return request
    .post(rootUrl + '/ses/sendEmail')
    .send(message)
    .then((res) => res.body)
}
