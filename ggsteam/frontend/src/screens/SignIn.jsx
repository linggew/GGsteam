import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import config from '../config'

const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      // Make an API call to your backend
      const response = await axios.get(config.apiUrl + '/api/login', {
        params: { username, password },
      })

      // Check if login is successful based on the response
      if (response.data && response.data.message === 'Login successful') {
        // console.log(
        //   '+++++++++++++++++++++++' + JSON.stringify(response.data, null, 2)
        // )
        // Redirect to the dashboard on successful login
        // navigate(`/?id=${response.data.user.user_id}`)
        // Save the user ID in local storage
        localStorage.setItem('userId', response.data.user.user_id)

        // Redirect to the dashboard on successful login
        navigate('/')
      } else {
        // Handle failed login
        alert('Invalid username or password')
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    }
  }

  return (
    <div className="loginContainer">
      <h1>Login Page</h1>
      <div className="loginbox">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
        <p>
          <span onClick={() => navigate('/forget-password')}>
            Forget Password
          </span>{' '}
          | <span onClick={() => navigate('/sign-up')}>Sign Up</span>
        </p>
      </div>
    </div>
  )
}

export default SignIn
