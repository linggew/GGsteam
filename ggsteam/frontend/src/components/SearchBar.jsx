import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import '../App.css'
import config from '../config'

const SearchBar = ({ onSearch }) => {
  const [gameList, setGameList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filteredGame, setFilteredGame] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(config.apiUrl + '/api/games', {})
        setGameList(res.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [searchTerm])

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    console.log('Search term:', searchTerm)
    setSearchTerm('')
    setIsModalVisible(true)
    const filtered = gameList.filter((game) =>
      game.QueryName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const limitedFiltered = filtered.slice(0, 10)
    setFilteredGame(limitedFiltered)
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
            <div>
              <ul className="listcontainer">
                {filteredGame.map((game, index) => (
                  <Link to={`/games/${game.query_id}`} className="link">
                    <li
                      key={index}
                      className="listbox"
                      style={{ cursor: 'pointer' }}>
                      <img
                        className="listimg"
                        src={game.HeaderImage}
                        alt={`fail to show ${game.QueryName}`}
                      />
                      <p>{game.QueryName}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
