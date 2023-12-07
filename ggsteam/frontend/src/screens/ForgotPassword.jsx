// ForgetPasswordPage.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import config from '../config'

const ForgetPasswordPage = () => {
  const [username, setUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.put(config.apiUrl + '/api/reset-password', {
        username,
        oldPassword,
        newPassword,
      })

      if (response.status === 200) {
        // Password reset successful
        console.log('Password reset successful')
        alert('Password reset successful')
        navigate('/login')
      } else {
        console.error('Password reset failed:', response.data.message)
        alert('Password reset failed: ' + response.data.message)
      }
    } catch (error) {
      console.error('Network error during password reset:', error.message)
      alert('Network error during password reset: ' + error.message)
    }
  }

  return (
    <div className="loginContainer">
      <h1>Reset Password Page</h1>
      <div className="loginbox">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Old Password:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Reset Password</button>
        </form>
        <p>
          <span onClick={() => navigate('/login')}>Back to Login</span>
        </p>
      </div>
    </div>
  )
}

export default ForgetPasswordPage
