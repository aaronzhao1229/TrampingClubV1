// import { refreshAuth } from '../apis/userApi'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import agent from '../apis/agent'

const useRefreshToken = () => {
  const dispatch = useDispatch()
  const refresh = async () => {
    // const response = await refreshAuth()
    const response = await agent.auth.refreshAuth()
    // const username = store.getState().auth.username
    dispatch(setCredentials({ ...response }))
    return response.accessToken
  }
  return refresh
}

export default useRefreshToken
