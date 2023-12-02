import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../App.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
const HomeContent = () => {
  const [gameList, setGameList] = useState([])

  const getGames = () => {
    Axios.get(config.apiUrl + '/api/games', {}).then((res) => {
      console.log(res.data)
      setGameList(res.data)
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
                <h1>most popular game</h1>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>

            {gameList.map((game) => {
              return (
                <div className="card">
                  <img
                    className="gameImg"
                    src={game.HeaderImage}
                    alt={game.QueryName}
                  />
                  <p> {game.QueryName} </p>
                </div>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-popular" className="linkStyles">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>
            {gameList.map((game) => {
              return (
                <div className="card">
                  <img
                    className="gameImg"
                    src={game.HeaderImage}
                    alt={game.QueryName}
                  />
                  <p> {game.QueryName} </p>
                </div>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-popular" className="linkStyles">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>
            {gameList.map((game) => {
              return (
                <div className="card">
                  <img
                    className="gameImg"
                    src={game.HeaderImage}
                    alt={game.QueryName}
                  />
                  <p> {game.QueryName} </p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="cardBox">
          <div className="cardContainer">
            <Link to="/most-popular" className="linkStyles">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>

            {gameList.map((game) => {
              return (
                <div className="card">
                  <img
                    className="gameImg"
                    src={game.HeaderImage}
                    alt={game.QueryName}
                  />
                  <p> {game.QueryName} </p>
                </div>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-popular" className="linkStyles">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>
            {gameList.map((game) => {
              return (
                <div className="card">
                  <img
                    className="gameImg"
                    src={game.HeaderImage}
                    alt={game.QueryName}
                  />
                  <p> {game.QueryName} </p>
                </div>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-popular" className="linkStyles">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <span className="arrow">&rarr;</span>
              </div>
            </Link>
            {gameList.map((game) => {
              return (
                <div className="card">
                  <img
                    className="gameImg"
                    src={game.HeaderImage}
                    alt={game.QueryName}
                  />
                  <p> {game.QueryName} </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <h1> Guess You Like</h1>
    </div>
  )
}

export default HomeContent
