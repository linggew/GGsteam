import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import '../App.css'
import config from '../config'

const SearchBar = () => {
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
  }, [])

  const handleInputChange = (event) => {
    const term = event.target.value
    setSearchTerm(term)

    // Update filteredGame based on the search term
    if (term.trim() === '') {
      // If search term is empty, don't display any games
      setFilteredGame([])
    } else {
      // Filter games based on the search term
      const filtered = gameList.filter((game) =>
        game.QueryName.toLowerCase().includes(term.toLowerCase())
      )
      const limitedFiltered = filtered.slice(0, 10)
      setFilteredGame(limitedFiltered)
    }
  }

  const handleSearch = () => {
    alert('Button Clicked!')
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
              <ul className="searchlist">
                {filteredGame.map((game, index) => (
                  <Link
                    to={`/games/${game.query_id}`}
                    className="link"
                    key={index}>
                    <li className="listbox" style={{ cursor: 'pointer' }}>
                      <img
                        className="listimg"
                        src={game.HeaderImage}
                        alt={`fail to show ${game.QueryName}`}
                      />
                      <p>{game.QueryName}</p>
                    </li>
                  </Link>
                ))}
                <p>Click Search Button to see more</p>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
