import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../config'
import '../App.css'
import { Header, Footer } from '../components'
function GameDetail() {
  const [game, setGame] = useState([])
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(config.apiUrl + `/api/games/${id}`, {})
        console.log(res.data)
        setGame(res.data[0])
        // console.log('++++++++++++hh' + poke.length)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  const backgroundImageUrl = game.Background
  const containerStyle = {
    background: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover', // You can adjust these properties based on your design needs
    backgroundPosition: 'center',
    minHeight: '100vh', // Set a minimum height to cover the entire viewport
  }
  return (
    <div>
      <Header />
      <div style={containerStyle} className="detailed">
        <div>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <div className="detailedbody">
              <h1>{game.QueryName}</h1>
              <img
                className="detailedimg"
                src={game.HeaderImage}
                alt={`fail to show ${game.QueryName}`}
              />
              <div className="ability">
                <p className="abilitytitle">ReleaseDate:{game.ReleaseDate}</p>
                <p className="abilitytitle">Price:{game.PriceFinal}</p>
                <p className="abilitytitle">
                  Supported Languages:{game.SupportedLanguages}
                </p>
                <p className="abilitytitle">
                  Description:{game.DetailedDescrip}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default GameDetail
