import { axiosPrivate } from '../apis/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import store from '../../store'

const useAxiosPrivate = () => {
  const token = store.getState().auth.token
  const refresh = useRefreshToken()
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      
    )
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bear ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [refresh])
  return axiosPrivate
}

export default useAxiosPrivate
