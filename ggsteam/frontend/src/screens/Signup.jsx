// SignUpPage.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Add validation logic here
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // Send signup data to your backend API
    // Example using fetch:
    // fetch('your-api-endpoint/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle success or error
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });

    // For this example, let's assume the signup was successful
    alert('Signup successful!')
    // Redirect to login page after signup
    navigate('/login')
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')}>Login</span>
      </p>
    </div>
  )
}

export default SignUp
