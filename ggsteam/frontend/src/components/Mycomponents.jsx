import React, { useEffect, useState } from 'react'
import axios from 'axios' // Import axios

const MyComponent = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data')
        setData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <p>Hello Cloud SQL!</p>
      <p>Data from Node.js Backend:</p>
      {data.map((item) => (
        <p key={item.id}>{JSON.stringify(item)}</p>
      ))}
    </div>
  )
}

export default MyComponent
