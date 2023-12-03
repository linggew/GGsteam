import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../App.css'
import { Link } from 'react-router-dom'
import config from '../config'
const HomeContent = () => {
  const [popularGame, setPopularGame] = useState([])
  const [mostPlayGame, setMostPlayGame] = useState([])
  const [bestDealGame, setBestDealGame] = useState([])
  const [popularFreeGame, setPopularFreeGame] = useState([])
  const [mostOwnedGame, setMostOwnedGame] = useState([])
  const [mostReviewedGame, setMostReviewedGame] = useState([])
  const [recomendGame, setRecomendGame] = useState([])
  const userid = localStorage.getItem('userId')
  const getGames = () => {
    // Fetch popular games
    Axios.get(config.apiUrl + '/api/most-popular/most-viewd1')
      .then((res) => {
        console.log('Popular Games:', res.data)
        setPopularGame(res.data)
      })
      .catch((error) => {
        console.error('Error fetching popular games:', error)
      })

    // Fetch most played games
    Axios.get(config.apiUrl + '/api/most2/most-viewd2')
      .then((res) => {
        console.log('Most Played Games:', res.data)
        setMostPlayGame(res.data)
      })
      .catch((error) => {
        console.error('Error fetching most played games:', error)
      })

    // Fetch best deal games
    Axios.get(config.apiUrl + '/api/most3/most-viewd3')
      .then((res) => {
        console.log('Best Deal Games:', res.data)
        setBestDealGame(res.data)
      })
      .catch((error) => {
        console.error('Error fetching best deal games:', error)
      })

    // Fetch popular free games
    Axios.get(config.apiUrl + '/api/most4/most-viewd4')
      .then((res) => {
        console.log('Popular Free Games:', res.data)
        setPopularFreeGame(res.data)
      })
      .catch((error) => {
        console.error('Error fetching popular free games:', error)
      })

    // Fetch most owned games
    Axios.get(config.apiUrl + '/api/most5/most-viewd5')
      .then((res) => {
        console.log('Most Owned Games:', res.data)
        setMostOwnedGame(res.data)
      })
      .catch((error) => {
        console.error('Error fetching most owned games:', error)
      })

    // Fetch most reviewed games
    Axios.get(config.apiUrl + '/api/most6/most-viewd6')
      .then((res) => {
        console.log('Most Reviewed Games:', res.data)
        setMostReviewedGame(res.data)
      })
      .catch((error) => {
        console.error('Error fetching most reviewed games:', error)
      })
    Axios.get(config.apiUrl + `/api/recommend/${userid}`)
      .then((res) => {
        console.log('Most Reviewed Games:', res.data)
        setRecomendGame(res.data)
      })
      .catch((error) => {
        console.error('Error fetching most reviewed games:', error)
      })
  }

  useEffect(() => {
    getGames()
  }, [])

  return (
    <div className="cardBody">
      <h1> Game List</h1>
      <div className="form">
        <div className="cardBox">
          <div className="cardContainer">
            <Link to="/most-popular" className="linkStyles">
              <div className="containerTitle">
                <h2 className="title">Most popular game</h2>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>

            {popularGame.map((game) => {
              return (
                <Link to={`/games/${game.query_id}`} className="homeGameLink">
                  <div className="card">
                    <img
                      className="gameImg"
                      src={game.HeaderImage}
                      alt={game.QueryName}
                    />
                    <p className="gameName"> {game.QueryName} </p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-played" className="linkStyles">
              <div className="containerTitle">
                <h2>Most played game</h2>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>
            {mostPlayGame.map((game) => {
              return (
                <Link to={`/games/${game.query_id}`} className="homeGameLink">
                  <div className="card">
                    <img
                      className="gameImg"
                      src={game.HeaderImage}
                      alt={game.QueryName}
                    />
                    <p className="gameName"> {game.QueryName} </p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-deal" className="linkStyles">
              <div className="containerTitle">
                <h2>Best deal of single player</h2>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>
            {bestDealGame.map((game) => {
              return (
                <Link to={`/games/${game.query_id}`} className="homeGameLink">
                  <div className="card">
                    <img
                      className="gameImg"
                      src={game.HeaderImage}
                      alt={game.QueryName}
                    />
                    <p className="gameName"> {game.QueryName} </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="cardBox">
          <div className="cardContainer">
            <Link to="/most-free" className="linkStyles">
              <div className="containerTitle">
                <h2>Popular free game</h2>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>

            {popularFreeGame.map((game) => {
              return (
                <Link to={`/games/${game.query_id}`} className="homeGameLink">
                  <div className="card">
                    <img
                      className="gameImg"
                      src={game.HeaderImage}
                      alt={game.QueryName}
                    />
                    <p className="gameName"> {game.QueryName} </p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-owned" className="linkStyles">
              <div className="containerTitle">
                <h2>Most Owned Paid Games</h2>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>
            {mostOwnedGame.map((game) => {
              return (
                <Link to={`/games/${game.query_id}`} className="homeGameLink">
                  <div className="card">
                    <img
                      className="gameImg"
                      src={game.HeaderImage}
                      alt={game.QueryName}
                    />
                    <p className="gameName"> {game.QueryName} </p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-reviewed" className="linkStyles">
              <div className="containerTitle">
                <h2>Most reviewed games </h2>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>
            {mostReviewedGame.map((game) => {
              return (
                <Link to={`/games/${game.query_id}`} className="homeGameLink">
                  <div className="card">
                    <img
                      className="gameImg"
                      src={game.HeaderImage}
                      alt={game.QueryName}
                    />
                    <p className="gameName"> {game.QueryName} </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <h1> Guess You Like</h1>
      <div className="cardContainer">
        {/* <Link to="/most-reviewed" className="linkStyles"> */}
        {/* <div className="containerTitle"> */}
        {/* <h2>Most reviewed games </h2> */}
        {/* <span className="arrow">&rarr;</span> */}
        {/* </div> */}
        {/* </Link> */}
        {recomendGame.map((game) => {
          return (
            <Link to={`/games/${game.query_id}`} className="homeGameLink">
              <div className="card">
                <img
                  className="gameImg"
                  src={game.HeaderImage}
                  alt={game.QueryName}
                />
                <p className="gameName"> {game.QueryName} </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default HomeContent
