import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import config from '../config'
import '../App.css'
import { Header, Footer } from '../components'
// import { useGameContext } from '../utils/GameContext'

function GameDetail() {
  const [game, setGame] = useState([])
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  // const { userid } = useGameContext()
  const userid = localStorage.getItem('userId')
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isInOwnedlist, setisInOwnedlist] = useState(false)

  console.log(userid, id)

  const addToWishList = async () => {
    try {
      const res = await Axios.post(config.apiUrl + '/api/wishlist/addgame', {
        userid,
        id,
      })
      if (res.status === 200) {
        setIsInWishlist(true)
      }
    } catch (err) {
      console.error('Failed to add to the wishlist.', err)
    }
  }

  const deleteFromWishList = async () => {
    try {
      const res = await Axios.delete(
        config.apiUrl + `/api/wishlist/removegame/${userid}/${id}`
      )
      if (res.status === 200) {
        setIsInWishlist(false)
      }
    } catch (err) {
      console.error('Failed to delete from the wishlist.', err)
    }
  }

  const addToOwnedList = async () => {
    try {
      const res = await Axios.post(config.apiUrl + '/api/ownedlist/addgame', {
        userid,
        id,
      })
      if (res.status === 200) {
        setisInOwnedlist(true)
      }
    } catch (err) {
      console.error('Failed to add to the ownedlist.', err)
    }
  }

  const deleteFromOwnedList = async () => {
    try {
      const res = await Axios.delete(
        config.apiUrl + `/api/ownedlist/removegame/${userid}/${id}`
      )
      if (res.status === 200) {
        setisInOwnedlist(false)
      }
    } catch (err) {
      console.error('Failed to delete from the ownedlist.', err)
    }
  }

  useEffect(() => {
    console.log('+++++++++++userid' + userid)
    const fetchData = async () => {
      try {
        const res = await Axios.get(config.apiUrl + `/api/games/${id}`, {})

        setGame(res.data[0])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleAddedToWishlist = async () => {
      try {
        const wishRes = await Axios.get(
          config.apiUrl + `/api/wishlist/${userid}`,
          {}
        )

        const wishlistRes = wishRes.data.filter(
          (d) => d.query_id.toString() === id
        )

        if (wishlistRes.length !== 0) {
          setIsInWishlist(true)
        }
      } catch (err) {
        console.error('Error fetching wishlist data: ', err)
      }
    }

    const handleAddedToOwnedlist = async () => {
      try {
        const ownedRes = await Axios.get(
          config.apiUrl + `/api/ownedlist/${userid}`,
          {}
        )

        const ownedlistRes = ownedRes.data.filter(
          (d) => d.query_id.toString() === id
        )

        if (ownedlistRes.length !== 0) {
          setisInOwnedlist(true)
        }
      } catch (err) {
        console.error('Error fetching ownedlist data: ', err)
      }
    }

    handleAddedToOwnedlist()
    handleAddedToWishlist()
  }, [id, userid])

  const backgroundImageUrl = game.Background
  const containerStyle = {
    background: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
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
              <h1 className="detailed">{game.QueryName}</h1>
              <img
                className="detailedimg"
                src={game.HeaderImage}
                alt={`fail to show ${game.QueryName}`}
              />
              <div className="ability">
                <p className="abilitytitle">ReleaseDate:{game.ReleaseDate}</p>
                <p className="abilitytitle">Price:{game.PriceFinal}</p>
                <div>
                  <button
                    className="buttonL"
                    onClick={isInWishlist ? deleteFromWishList : addToWishList}>
                    {isInWishlist
                      ? 'Remove from your Wishlist'
                      : 'Add to your Wishlist'}
                  </button>
                  <button
                    className="buttonL"
                    onClick={
                      isInOwnedlist ? deleteFromOwnedList : addToOwnedList
                    }>
                    {isInOwnedlist
                      ? 'Remove from your Ownedlist'
                      : 'Add to your Ownedlist'}
                  </button>
                </div>
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
