import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { Route, Routes, Link } from 'react-router-dom'
import '../App.css'

const BurgerMenu = () => {
  // to change burger classes
  const [burger_class, setBurgerClass] = useState('burger-bar unclicked')
  const [isMenuClicked, setIsMenuClicked] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('burger-bar clicked')
      setDrawerOpen(true)
      // setMenuClass('menu visible')
    } else {
      setBurgerClass('burger-bar unclicked')
      // setMenuClass('menu hidden')
      setDrawerOpen(false)
    }
    setIsMenuClicked(!isMenuClicked)
  }

  return (
    <div>
      <div className="burger-menu" onClick={updateMenu}>
        {/* burger_bar */}
        <div className={burger_class}></div>
        <div className={burger_class}></div>
        <div className={burger_class}></div>
      </div>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={updateMenu}
        PaperProps={{
          className: 'drawerPaper',
        }}>
        <div className="drawer-content">
          {/* Navigation links */}
          <nav>
            <ul style={{ display: 'flex', flexDirection: 'column' }}>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Drawer>
    </div>
  )
}

export default BurgerMenu
