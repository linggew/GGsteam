import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import '../App.css'
import { useState } from 'react'
import { Menu, Profile } from './'

export default function ToolBar() {
  return (
    <nav>
      <Menu />
      <img src={require('../assets/logo.jpg')} alt="logo" />
      <img src={require('../assets/search.png')} alt="search" />
      <Profile />
    </nav>
  )
}
