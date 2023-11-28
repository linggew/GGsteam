import React, { useState } from 'react'
import axios from 'axios'
import config from '../config'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(config.apiUrl + '/api/signup', {
        username,
        password,
      })
      setMessage(response.data)
    } catch (error) {
      setMessage('Failed to sign up')
    }
  }

  return (
    <div className="loginContainer">
      <h1>Sign Up</h1>
      <div className="loginbox">
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign Up</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default SignUp
