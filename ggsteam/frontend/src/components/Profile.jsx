// ProfileComponent.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const Profile = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigation = useNavigate()
  const username = localStorage.getItem('userName')
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const signOut = () => {
    // Add your sign-out logic here
    alert('Signing out...')
    localStorage.clear()
    navigation('/login')
  }
  return (
    <div className="profile-container">
      <img
        src={require('../assets/profile.png')}
        alt="Profile"
        className="profile-photo"
        onClick={toggleDropdown}
      />
      {dropdownVisible && (
        <div className="profile-info">
          <p className="profile-name">{username}</p>
          <button className="sign-out-btn" onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile
