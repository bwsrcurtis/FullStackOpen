import Countries from './Components/Countries';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filterName, setfilterName] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setShow(!show)
    setfilterName(event.target.value)
  }

  const filteredCountries = countries.filter(e => {
    return (
      e.name.official.toLowerCase().includes(filterName.toLowerCase())
    )
  })

  const toggleShow = (name) => {
    setfilterName(name)
  }

  return (
    <>
      <p>find countries</p>
      <input onChange={handleFilterChange} value={filterName}></input>
      <Countries toggleShow={toggleShow} show={show} countries={filteredCountries}></Countries>
    </>
  );
}

export default App;
