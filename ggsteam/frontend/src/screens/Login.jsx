// LoginPage.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()

  const handleLogin = () => {
    // Simulate login logic (in a real app, this would be an API call)
    if (username === 'user' && password === 'password') {
      // Redirect to the dashboard on successful login
      history('/home')
    } else {
      alert('Invalid username or password')
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
          <span onClick={() => history('/forget-password')}>
            Forget Password
          </span>{' '}
          | <span onClick={() => history('/sign-up')}>Sign Up</span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
