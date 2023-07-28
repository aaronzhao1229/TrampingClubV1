import axios from '../apis/axios'
import store from '../../store'
import { logOut } from '../../features/auth/authSlice'

const useLogout = () => {
  const logout = async () => {
    store.dispatch(logOut())
    try {
      const response = await axios('/user/logout', {
        withCredentials: true,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return logout
}

export default useLogout
