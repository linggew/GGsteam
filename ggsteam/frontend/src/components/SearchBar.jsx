import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    console.log('Search term:', searchTerm)
    setSearchTerm('')
    setIsModalVisible(true)
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onClick={openModal} // Open the modal when the input is clicked
      />
      <button onClick={handleSearch}>Search</button>

      {/* Modal */}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Modal content here...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
