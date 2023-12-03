import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useLocation } from 'react-router-dom'
import '../App.css'
import { Header, Footer, GameFilter } from '../components'
function SearchList() {
  const [gameList, setGameList] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Number of items to display per page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const [filteredGame, setFilteredGame] = useState(gameList)
  const location = useLocation()
  const searchTerm = new URLSearchParams(location.search).get('searchTerm')

  useEffect(() => {
    // console.log('---------' + searchTerm)
    const handleSearch = async () => {
      try {
        const response = await axios.get(config.apiUrl + '/api/search', {
          params: { searchTerm },
        })

        console.log('Search results:', response.data)
        setGameList(response.data)
        setLoading(false)
        setFilteredGame(response.data.slice(startIndex, endIndex))
      } catch (error) {
        console.error('Error during search:', error)
      }
    }

    handleSearch()
  }, [currentPage])

  return (
    <div>
      <Header />
      <div className="listbody">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="listbodyy">
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
            <div className="listbutton">
              <button
                className="buttonL"
                onClick={() => {
                  setCurrentPage(currentPage - 1)
                  console.log('clicked')
                }}
                disabled={currentPage === 1}>
                Previous1
              </button>
              <button
                className="buttonL"
                onClick={() => {
                  setCurrentPage(currentPage + 1)
                  console.log('clicked')
                }}
                disabled={endIndex >= gameList.length}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SearchList
