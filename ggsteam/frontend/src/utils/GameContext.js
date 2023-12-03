// UserIdContext.js
import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export const GameContextProvider = ({ children }) => {
  const [userid, setUserId] = useState(null)

  const setGlobalUserId = (id) => {
    setUserId(id)
  }

  return (
    <GameContext.Provider value={{ userid, setGlobalUserId }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  return useContext(GameContext)
}
