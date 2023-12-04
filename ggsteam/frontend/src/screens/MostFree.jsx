import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import config from '../config'
import '../App.css'
import { Header, Footer, GameFilter } from '../components'

function MostFree() {
  const [gameList, setGameList] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Number of items to display per page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const [filteredGame, setFilteredGame] = useState(gameList)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(config.apiUrl + '/api/most4', {
          params: {
            categoryid: 'none',
            age: 'none',
            pricelow: 'none',
            pricehigh: 'none',
            pcscore: 'none',
          },
        })
        setGameList(res.data)
        setLoading(false)
        setFilteredGame(res.data.slice(startIndex, endIndex))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [currentPage])
  const handleFilter = (filter_param) => {
    // console.log('++++++++++++++++++++++++category:' + filter_param.category)
    // console.log('++++++++++++++++++++++++age:' + filter_param.age)
    // console.log('++++++++++++++++++++++++min:' + filter_param.min)
    // console.log('++++++++++++++++++++++++max:' + filter_param.max)
    // console.log('++++++++++++++++++++++++score:' + filter_param.score)
    const fetchFiltedData = async () => {
      try {
        const res = await Axios.get(config.apiUrl + '/api/most2', {
          params: {
            categoryid: filter_param.category,
            age: filter_param.age,
            pricelow: filter_param.min,
            pricehigh: filter_param.max,
            pcscore: filter_param.score,
          },
        })
        setGameList(res.data)
        setLoading(false)
        setFilteredGame(res.data.slice(startIndex, endIndex))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchFiltedData()
  }
  return (
    <div>
      <Header />
      <div className="listbody">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="listbodyy">
            <div>
              <GameFilter onFilter={handleFilter} />
            </div>
            <h1>Most Popular Free Game</h1>
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

export default MostFree
