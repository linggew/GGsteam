import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../App.css'
import { Route, Routes, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
const MyComponent = () => {
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
      <h1> CRUD APPLICATIONS</h1>
      <div className="form">
        <label> Game Lists:</label>

        {/* <button onClick={getGames}> Get Games </button> */}
        <div className="cardBox">
          <div className="cardContainer">
            <Link to="/most-popular">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ marginLeft: '20px', transform: 'translateY(4px)' }}
                />{' '}
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
            <Link to="/most-popular">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ marginLeft: '20px', transform: 'translateY(4px)' }}
                />{' '}
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
            <Link to="/most-popular">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ marginLeft: '20px', transform: 'translateY(4px)' }}
                />{' '}
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
                  <p>{game.QueryName} </p>
                </div>
              )
            })}
          </div>
          <div className="cardContainer">
            <Link to="/most-popular">
              <div className="containerTitle">
                <h1>most popular game</h1>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ marginLeft: '20px', transform: 'translateY(4px)' }}
                />{' '}
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
                  <p>{game.QueryName} </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyComponent
