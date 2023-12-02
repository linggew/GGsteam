// ProfileComponent.jsx
import React, { useState } from 'react'
import '../App.css'

const Profile = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const signOut = () => {
    // Add your sign-out logic here
    alert('Signing out...')
  }

  return (
    <div className="profile-container">
      <img
        src="profile-placeholder.jpg"
        alt="Profile"
        className="profile-photo"
        onClick={toggleDropdown}
      />
      {dropdownVisible && (
        <div className="profile-info">
          <p className="profile-name">John Doe</p>
          <button className="sign-out-btn" onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile
