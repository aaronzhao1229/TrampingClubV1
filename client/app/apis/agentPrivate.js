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
    // we are not able to catch and handle the responses in Axios interceptors. That's not what they say it's been designed for. Therefore, we still need to catch the errors inside our components as well. We still need to catch the error at the end of the errors journey
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
  addMorePhotos: (albumId, photos) =>
    requests.postForm(`/album/addMorePhotos/${albumId}`, photos),
  deletePhotoByPhotoId: (photoId) =>
    requests.delete(`/album/deletePhoto/${photoId}`),
  deleteAlbumByAlbumId: (albumId) =>
    requests.delete(`/album/deleteAlbum/${albumId}`),
}

const programmes = {
  uploadProgramme: (newProgramme) =>
    requests.postForm('/programme/updateProgramme', newProgramme),
}

const videos = {
  createVideo: (newVideo) => requests.post('/videos/create', newVideo),
  deleteVideo: (videoId) => requests.delete(`/videos/delete/${videoId}`),
  editVideo: (editedVideo) =>
    requests.patch(`/videos/edit/${editedVideo.videoId}`, editedVideo),
}

const agentPrivate = {
  album,
  videos,
  programmes,
}

export default agentPrivate
