import { refreshAuth } from '../apis/userApi'
import store from '../../store'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'

const useRefreshToken = () => {
  const dispatch = useDispatch()
  const refresh = async () => {
    const response = await refreshAuth()
    const username = store.getState().auth.username
    dispatch(setCredentials({ ...response, username }))
    return response.accessToken
  }
  return refresh
}

export default useRefreshToken
