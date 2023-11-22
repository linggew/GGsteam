import "./App.css"
import React, { useState, useEffect } from "react"
import Axios from "axios"
import NavBar from './components/NavBar'
function App () {
  // const [gameList, setGameList] = useState([])

  // const getGames = () => {
  //   Axios.get("http://localhost:3002/games", {}).then((res) => {
  //     console.log(res.data)
  //     setGameList(res.data)
  //   })
  // }

  return (
    <div className='App'>
      {/* <h1> CRUD APPLICATIONS</h1>

      <div className='form'>
        <label> Game Lists:</label>

        <button onClick={getGames}> Get Games </button>

        {gameList.map((game) => {
          return (
            <div className='card'>
              <img
                className='gameImg'
                src={game.HeaderImage}
                alt={game.QueryName}
              />
              <p> Game Name: {game.QueryName} </p>
              <p> Release Date: {game.ReleaseDate}</p>
            </div>
          )
        })}
      </div> */}
      <NavBar />
    </div>
  )
}

export default App
