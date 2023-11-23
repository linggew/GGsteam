import React from 'react'
import MyComponent from '../components/Mycomponents'
import NavBar from '../components/NavBar'
import Footer from '../components/footer'
import '../App.css'
export default function Home() {
  return (
    <div className="pagecontainer">
      <NavBar />
      <MyComponent />
      <Footer />
    </div>
  )
}
