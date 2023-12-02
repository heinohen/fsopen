import { useEffect, useState } from 'react'
import CountryList from './components/CountryList'
import Search from './components/Search'
import CountryService from './services/countries'
import './index.css'



// Pohja phonebookista,
// uutta:
// services/weather.js
// WeatherData.jsx
// muut oikeastaan muutettu edellistä.



const App = () => {
  const [countries, setCountries] = useState([])
  const [showFiltered, setFiltered] = useState('')

  useEffect(() => {
    CountryService
      .getAll()
      .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  const handleSearch = (event) => {
    setFiltered(event.target.value)
  }
// tällä asetetaan yhdelle maalle filtteri napin kanssa
  const handleShow = (name) => {
    setFiltered(name)
  }

// Lisätty notification container, jottei sivu hypi ylös-alas kun notification tulee ruudulle
  return (
    <div className='body-container'>
        <div>
          <p>find countries: </p><Search value = {showFiltered} handleChange={handleSearch} />
        </div>
        <div>
          <CountryList countries = {countries} showFiltered = {showFiltered} tamanappi={handleShow} />
        </div>
    </div>
  )
}
export default App
