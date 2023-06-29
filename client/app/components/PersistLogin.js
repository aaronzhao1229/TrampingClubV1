import { Outlet } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { useSelector } from 'react-redux'
import LoadingComponent from './LoadingComponent'

export default function PersistLogin() {
  const auth = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`at: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading])

  return <>{isLoading ? <LoadingComponent /> : <Outlet />}</>
}
