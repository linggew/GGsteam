import React, { useState } from 'react'

const GameFilter = ({ onFilter }) => {
  const [category, setCategory] = useState('')
  const [age, setAge] = useState('')
  const [price, setPrice] = useState('')
  const [isPC, setIsPC] = useState(false)

  const handleFilter = () => {
    // 在这里处理筛选逻辑，并传递筛选条件给父组件
    const filters = {
      category,
      age,
      price,
      isPC,
    }
    onFilter(filters)
  }

  return (
    <div>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Strategy">Strategy</option>
          {/* 其他选项 */}
        </select>
      </label>

      <label>
        Age:
        <select value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="">Select Age</option>
          <option value="E">Everyone</option>
          <option value="E10+">Everyone 10 and older</option>
          <option value="T">Teen</option>
          {/* 其他选项 */}
        </select>
      </label>

      <label>
        Price:
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Select Price Range</option>
          <option value="20">$0 - $20</option>
          <option value="50">$21 - $50</option>
          <option value="100">$51 - $100</option>
          {/* 其他选项 */}
        </select>
      </label>

      <label>
        PC:
        <select
          value={isPC}
          onChange={(e) => setIsPC(e.target.value === 'true')}>
          <option value="">Select PC Compatibility</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  )
}

export default GameFilter
