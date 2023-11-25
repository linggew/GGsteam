// ForgetPasswordPage.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add logic here to handle the password reset request
    // For simplicity, we'll just log the email for now
    console.log('Password reset requested for email:', email)
    // You can redirect the user to a confirmation page or handle it as needed
  }

  return (
    <div className="loginContainer">
      <h1>Forget Password Page</h1>
      <div className="loginbox">
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <p>
          <span onClick={() => navigate('/login')}>Back to Login</span>
        </p>
      </div>
    </div>
  )
}

export default ForgetPasswordPage
