import "./App.css"
import React from "react"
import { Route, Routes } from 'react-router-dom'
import { MostPlayed, MostCommended, MostOwned, MostPopular, GameDetail, About, Help, Home, SignIn, SignUp, ForgotPassword, FavoriteList, ShopCart, MostReviewed, MostFree, MostDeal } from "./screens/index"
function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/favorite" element={<FavoriteList />} />
        <Route path="/shopcart" element={<ShopCart />} />
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/most-popular" element={<MostPopular />} />
        <Route path="/most-owned" element={<MostOwned />} />
        <Route path="/most-reviewed" element={<MostReviewed />} />
        <Route path="/most-free" element={<MostFree />} />
        <Route path="/most-deal" element={<MostDeal />} />
        <Route path="/most-played" element={<MostPlayed />} />
        <Route path="/games/:id" element={<GameDetail />} />
      </Routes>
    </div>
  )
}

export default App
