import "./App.css"
import React from "react"
import { Route, Routes } from 'react-router-dom'
import { MostPlayed, MostOwned, MostPopular, GameDetail, About, Help, Home, SignIn, SignUp, ForgotPassword, FavoriteList, ShopCart, MostReviewed, MostFree, MostDeal } from "./screens/index"
import SearchList from "./screens/SearchList"
import AuthLogin from "./utils/AuthLogin"
function App () {
  return (
    <div className='App'>
      {/* <GameContextProvider> */}
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/favorite" element={<AuthLogin><FavoriteList /></AuthLogin>} />
        <Route path="/shopcart" element={<AuthLogin><ShopCart /></AuthLogin>} />
        <Route path="/" element={<AuthLogin><Home /></AuthLogin>} />
        <Route path="/help" element={<AuthLogin><Help /></AuthLogin>} />
        <Route path="/about" element={<AuthLogin><About /></AuthLogin>} />
        <Route path="/most-popular" element={<AuthLogin><MostPopular /></AuthLogin>} />
        <Route path="/most-owned" element={<AuthLogin><MostOwned /></AuthLogin>} />
        <Route path="/most-reviewed" element={<AuthLogin><MostReviewed /></AuthLogin>} />
        <Route path="/most-free" element={<AuthLogin><MostFree /></AuthLogin>} />
        <Route path="/most-deal" element={<AuthLogin><MostDeal /></AuthLogin>} />
        <Route path="/most-played" element={<AuthLogin><MostPlayed /></AuthLogin>} />
        <Route path="/games/:id" element={<AuthLogin><GameDetail /></AuthLogin>} />
        <Route path="/search-result" element={<AuthLogin><SearchList /></AuthLogin>} />
      </Routes>
      {/* </GameContextProvider> */}
    </div>
  )
}

export default App
