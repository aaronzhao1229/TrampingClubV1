import axiosFile from './axios'

const responseBody = (response) => response.data

const requests = {
  get: (url, params) => axiosFile.get(url, { params }).then(responseBody),
  post: (url, body) => axiosFile.post(url, body).then(responseBody),
  put: (url, body) => axiosFile.put(url, body).then(responseBody),
  delete: (url) => axiosFile.delete(url).then(responseBody),
  postForm: (url, data) =>
    axiosFile
      .post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
  putForm: (url, data) =>
    axiosFile
      .put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
}

const programmes = {
  getProgrammes: () => requests.get('/programme'),
}

const auth = {
  login: (userInfo) => requests.post('/user/login', userInfo),
  register: (values) => requests.post('/user/createUser', values),
  refreshAuth: () => requests.get('/user/refresh'),
  forgetPassword: (email) => requests.post('/user/forgetPassword', email),
  resetPassword: (values) => requests.post('/user/resetPassword', values),
}

const album = {
  getAlbum: () => requests.get('/album'),
  getPhotosByAlbumId: (albumId) => requests.get(`/album/getPhotos/${albumId}`),
}

const contact = {
  contactUs: (message) => requests.post('/ses/sendEmail', message),
}

const agent = {
  programmes,
  auth,
  contact,
  album,
}

export default agent
