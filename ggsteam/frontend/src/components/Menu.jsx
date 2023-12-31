import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { Link } from 'react-router-dom'
import '../App.css'

const Menu = () => {
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
          style: {
            backgroundColor: 'rgba(51, 51, 51, 0.8)',
          },
        }}>
        <div className="drawer-content">
          <nav>
            <ul style={{ display: 'flex', flexDirection: 'column' }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorite">Favorite List</Link>
              </li>
              <li>
                <Link to="/shopcart">Library</Link>
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

export default Menu
