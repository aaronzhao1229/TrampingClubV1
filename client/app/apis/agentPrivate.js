import { axiosPrivate } from './axios'
import store from '../../store'
// import { refreshAuth } from './userApi'
import { setCredentials } from '../../features/auth/authSlice'
import agent from './agent'

const responseBody = (response) => response.data
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const username = store.getState().auth.username
    const prevRequest = error?.config
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true

      const newAccessToken = await agent.auth.refreshAuth()

      store.dispatch(setCredentials({ ...newAccessToken, username }))
      prevRequest.headers[
        'Authorization'
      ] = `Bearer ${newAccessToken.accessToken}`
      return axiosPrivate(prevRequest)
    }
    return Promise.reject(error)
  }
)

const requests = {
  get: (url) => axiosPrivate.get(url).then(responseBody),
  post: (url, body) => axiosPrivate.post(url, body).then(responseBody),
  put: (url, body) => axiosPrivate.put(url, body).then(responseBody),
  patch: (url, body) => axiosPrivate.patch(url, body).then(responseBody),
  delete: (url) => axiosPrivate.delete(url).then(responseBody),
  postForm: (url, data) =>
    axiosPrivate
      .post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
  putForm: (url, data) =>
    axiosPrivate
      .put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
}

const album = {
  editAlbum: (editedAlbum) =>
    requests.patch(`/album/editAlbum/${editedAlbum.albumId}`, editedAlbum),
  createAlbum: (newAlbum) => requests.postForm('/album/uploadImage', newAlbum),
  deletePhotoByPhotoId: (photoId) =>
    requests.delete(`/album/deletePhoto/${photoId}`),
  deleteAlbumByAlbumId: (albumId) =>
    requests.delete(`/album/deleteAlbum/${albumId}`),
}

const programmes = {
  uploadProgramme: (newProgramme) =>
    requests.postForm('/programme/updateProgramme', newProgramme),
}

const auth = {
  // refreshAuth: () => requests.get('/user/refresh'),
}

const agentPrivate = {
  album,
  auth,
  programmes,
}

export default agentPrivate
