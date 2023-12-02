import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import config from '../config'
import '../App.css'
import { Header, Footer } from '../components'

function MostPopular() {
  const [gameList, setGameList] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Number of items to display per page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const [filteredPokemons, setFilteredPokemons] = useState(gameList)
  useEffect(() => {
    // console.log('+++++++++++++:  ' + currentPage)
    const fetchData = async () => {
      try {
        const res = await Axios.get(config.apiUrl + '/api/most-popular', {})
        setGameList(res.data)
        setLoading(false)
        setFilteredPokemons(res.data.slice(startIndex, endIndex))
        // console.log('+++++++++++++:  ' + filteredPokemons.length)
        // console.log('ooooooo:  ' + startIndex)
        // console.log('ooooooo:  ' + endIndex)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [currentPage])

  return (
    <div>
      <Header />
      <div className="listbody">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="listbodyy">
            {/* <div className="listbutton"> */}
            {/* <PokemonSearch onSearch={handleSearch} /> */}
            {/* <SortBar handleSort={sortAllPokemons} /> */}
            {/* </div> */}
            <ul className="listcontainer">
              {filteredPokemons.map((pokemon, index) => (
                <Link to={`/games/${pokemon.query_id}`} className="link">
                  <li
                    key={index}
                    className="listbox"
                    style={{ cursor: 'pointer' }}>
                    <img
                      className="listimg"
                      src={pokemon.HeaderImage}
                      alt={`fail to show ${pokemon.QueryName}`}
                    />
                    <p>{pokemon.QueryName}</p>
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

export default MostPopular
