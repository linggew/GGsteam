import "./App.css"
import React, { useState, useEffect } from "react"
import Axios from "axios"
import NavBar from './components/NavBar'
import { Route, Routes, Link } from 'react-router-dom'
import Login from './screens/Login'
import SignUp from './screens/Signup'
import ForgotPassword from './screens/ForgotPassword'
import Home from './screens/Home'
import Help from './screens/Help'
import About from './screens/About'
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

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/most-popular" element={<About />} />
        <Route path="/most-owned" element={<About />} />
        <Route path="/most-commented" element={<About />} />
        <Route path="/trend" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
