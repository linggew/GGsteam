import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthLogin = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      navigate('/login')
    }
  }, [navigate])

  return <>{children}</>
}

export default AuthLogin
