import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import config from '../config'

const GameFilter = ({ onFilter }) => {
  const [category, setCategory] = useState('')
  const [age, setAge] = useState(100)
  const [price, setPrice] = useState({ min: '', max: '' })
  const [isPC, setIsPC] = useState(false)
  const [rom, setRom] = useState('')
  const [ram, setRam] = useState('')
  const [cpu, setCpu] = useState('')
  const [gpu, setGpu] = useState('')
  const [storage, setStorage] = useState('')
  const [gameCategory, setGameCategory] = useState([])
  const getGames = () => {
    // Fetch popular games
    Axios.get(config.apiUrl + '/api/category')
      .then((res) => {
        console.log('Popular Games:', res.data)
        setGameCategory(res.data)
        console.log(
          '++++++++++++++++++++Category:' + JSON.stringify(res.data, null, 2)
        )
      })
      .catch((error) => {
        console.error('Error fetching popular games:', error)
      })
  }

  useEffect(() => {
    getGames()
  }, [])

  const handleFilter = () => {
    const filterParams = {
      category: category === '' ? 'none' : parseInt(category, 10),
      age: age,
      min: price.min === '' ? 'none' : parseInt(price.min, 10),
      max: price.max === '' ? 'none' : parseInt(price.max, 10),
      score: isPC
        ? Math.floor(Math.random() * (5000 - 2800 + 1)) + 2800
        : 'none',
    }

    onFilter(filterParams)
  }

  return (
    <div>
      <label style={{ color: 'white', fontWeight: 'bold' }}>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="none">Select Category</option>
          {gameCategory.map((category) => (
            <option key={category.id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </label>

      <label style={{ color: 'white', fontWeight: 'bold' }}>
        Age:
        <select
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value, 10))}>
          <option value="100">Select Age</option>
          <option value="100">Everyone</option>
          <option value="18">18+</option>
          <option value="12">12+</option>
        </select>
      </label>
      <p style={{ display: 'inline', fontWeight: 'bold', color: 'white' }}>
        Price:
      </p>
      <input
        type="number"
        placeholder="Max Price"
        value={price.max}
        onChange={(e) => setPrice({ ...price, max: e.target.value })}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={price.min}
        onChange={(e) => setPrice({ ...price, min: e.target.value })}
      />
      <div>
        <p style={{ display: 'inline', fontWeight: 'bold', color: 'white' }}>
          PC:
        </p>
        <input
          type="number"
          placeholder="CPU"
          value={cpu}
          onChange={(e) => {
            setIsPC(true)
            setCpu(e.target.value)
          }}
        />
        <input
          type="number"
          placeholder="GPU"
          value={gpu}
          onChange={(e) => {
            setIsPC(true)
            setGpu(e.target.value)
          }}
        />
        <input
          type="number"
          placeholder="RAM"
          value={ram}
          onChange={(e) => {
            setIsPC(true)
            setRam(e.target.value)
          }}
        />
        <input
          type="number"
          placeholder="ROM"
          value={rom}
          onChange={(e) => {
            setIsPC(true)
            setRom(e.target.value)
          }}
        />
        <input
          type="number"
          placeholder="Storage"
          value={storage}
          onChange={(e) => {
            setIsPC(true)
            setStorage(e.target.value)
          }}
        />

        <button onClick={handleFilter}>Apply Filter</button>
      </div>
    </div>
  )
}
export default GameFilter
