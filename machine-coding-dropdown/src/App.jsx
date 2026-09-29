import { useState } from 'react'
import './App.css'

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)


  const countries = [
    {
      name: 'India',
      value: 'IN',
      cities: [
        'Delhi',
        'Mumbai'
      ]
    },
    {
      name: 'Pakistan',
      value: 'PK',
      cities: [
        'Lahore',
        'Karachi'
      ]
    },
    {
      name: 'Bangladesh',
      value: 'BG',
      cities: [
        'Dhaka',
        'Chattagram'
      ]
    },
  ]

  const handleChange = (e) => {
    setSelectedCountry(e.target.value)
  }

  return (
    <>
      <select onChange={handleChange} defaultValue="">
        <option value="" disabled>Please select a country</option>
        {countries.map((country) => (
          <option value={country.value} key={country.value}>{country.name}</option>
        ))}
      </select>

      {selectedCountry != null ?
        <select>
          {countries.filter((country) => country.value === selectedCountry)[0].cities.map((city) => (
            <option key={city}>
              {city}
            </option>
          ))}
        </select>
        : null}
    </>

  )
}

export default App
