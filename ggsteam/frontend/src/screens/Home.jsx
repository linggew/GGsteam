import React, { useEffect } from 'react'
import '../App.css'
import { ToolBar, Footer, HomeContent } from '../components'
import { useLocation } from 'react-router-dom'
import { useGameContext } from '../utils/GameContext'

export default function Home() {
  // const location = useLocation()
  // const { setGlobalUserId } = useGameContext()
  // const userid = new URLSearchParams(location.search).get('id')

  // useEffect(() => {
  //   // Set the userid in the context when the component mounts
  //   setGlobalUserId(userid)
  // }, [setGlobalUserId, userid])

  // console.log('++++++++' + userid)

  return (
    <div className="pagecontainer">
      <ToolBar />
      <HomeContent />
      <Footer />
    </div>
  )
}
