import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import '../App.css'
import BurgerMenu from './Burger'
import DropdownMenu from './Dropdown'
import { useState } from 'react'
import ProfileComponent from './Profile'
export default function NavBar() {
  const [rankClick, setRankClick] = useState(false)
  const [rankway, setRankway] = useState('')
  const handleCategoryChange = (selectedCategory) => {
    // Handle selected category
    console.log('Selected Category:', selectedCategory)
  }

  const handlePlatformChange = (selectedPlatform) => {
    // Handle selected platform
    console.log('Selected Platform:', selectedPlatform)
  }
  const handleRankClick = () => {
    setRankClick(!rankClick)
  }
  const handleRankway = () => {
    setRankway(rankway)
  }
  return (
    <nav>
      <BurgerMenu />
      <img src={require('../assets/logo.jpg')} alt="logo" />
      <img src={require('../assets/search.png')} alt="search" />
      <DropdownMenu
        onSelectCategory={handleCategoryChange}
        onSelectPC={handlePlatformChange}
      />
      <img
        src={require('../assets/rank.jpg')}
        alt="rank"
        onClick={handleRankClick}
      />
      {/* Display the dropdown content based on the state */}
      {rankClick && (
        <select name="" id="rank" value={rankway} onChange={handleRankway}>
          <option value="option1">option1</option>
          <option value="option2">option1</option>
        </select>
      )}
      <ul>
        <CustomLink to="/home">属性1</CustomLink>
        <CustomLink to="/about">属性2</CustomLink>
        <CustomLink to="/help">属性3</CustomLink>
      </ul>
      <ProfileComponent />
    </nav>
  )
}
function CustomLink({ to, children, ...props }) {
  const getPath = useResolvedPath(to)
  const isActive = useMatch({ path: getPath.pathname, end: true })
  console.log('getPath:', getPath)
  console.log('isActive:', isActive)
  console.log(children)
  return (
    <li className={isActive ? 'activeheader' : 'headerList'}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
