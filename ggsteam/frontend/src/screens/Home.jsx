import React from 'react'
import '../App.css'
import { ToolBar, Footer, HomeContent } from '../components'
export default function Home() {
  return (
    <div className="pagecontainer">
      <ToolBar />
      <HomeContent />
      <Footer />
    </div>
  )
}
