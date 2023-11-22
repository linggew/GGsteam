import React, { useState } from 'react'

const DropdownMenu = ({ onSelectCategory, onSelectPC }) => {
  const [pc, setPC] = useState('')
  const [category, setCategory] = useState('')
  const [filterText, setFilterText] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const handlePC = (event) => {
    setPC(event.target.value)
    onSelectPC(event.target.value)
  }
  const handleCatergory = (event) => {
    setCategory(event.target.value)
    onSelectCategory(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value)
  }

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value)
  }

  return (
    <div>
      <label htmlFor="category">Catergory:</label>
      <select name="" id="category" value={category} onChange={handleCatergory}>
        <option value="option1">option1</option>
        <option value="option2">option1</option>
      </select>

      <label htmlFor="pc">PC Platform:</label>
      <select name="" id="pc" value={pc} onChange={handlePC}>
        <option value="option1">option1</option>
        <option value="option2">option1</option>
      </select>
      <input
        type="text"
        placeholder="Filter by age"
        value={filterText}
        onChange={handleFilterChange}
      />
      {/* Price Range Filter */}
      <label htmlFor="minPrice">Min Price:</label>
      <input
        type="number"
        id="minPrice"
        value={minPrice}
        onChange={handleMinPriceChange}
      />

      <label htmlFor="maxPrice">Max Price:</label>
      <input
        type="number"
        id="maxPrice"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
    </div>
  )
}
export default DropdownMenu
