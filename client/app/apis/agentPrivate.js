import { axiosPrivate } from './axios'
import store from '../../store'
import { refreshAuth } from './userApi'
import { setCredentials } from '../../features/auth/authSlice'

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

      const newAccessToken = await refreshAuth()

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
  // post: (url, body) => axios.post(url, body).then(responseBody),
  // put: (url, body) => axios.put(url, body).then(responseBody),
  // delete: (url) => axios.delete(url).then(responseBody),
  // postForm: (url, data) =>
  //   axios
  //     .post(url, data, {
  //       headers: { 'Content-type': 'multipart/form-data' },
  //     })
  //     .then(responseBody),
  // putForm: (url, data) =>
  //   axios
  //     .put(url, data, {
  //       headers: { 'Content-type': 'multipart/form-data' },
  //     })
  //     .then(responseBody),
}

const album = {
  getAlbum: () => requests.get('/album'),
}

const agentPrivate = {
  album,
}

export default agentPrivate
