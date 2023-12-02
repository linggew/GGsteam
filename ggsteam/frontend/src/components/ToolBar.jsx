import '../App.css'
import { Menu, Profile, SearchBar } from './'

export default function ToolBar() {
  return (
    <nav className="toolbar-container">
      <Menu />
      <img className="logo" src={require('../assets/logo.jpg')} alt="logo" />
      <SearchBar />
      <div className="profile-container">
        <Profile />
      </div>
    </nav>
  )
}
