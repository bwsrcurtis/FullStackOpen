import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({ country }) => {
	const [weather, setWeather] = useState('')
	useEffect(() => {
		axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
			.then(response => {
				setWeather(response.data)
			})
	}, [country.latlng])
	console.log(weather)

	return (
		<>
			<h1>{country.name.common}</h1>
			<p>Capital: {country.capital}</p>
			<p>Area: {country.area}</p>
			<h2>languages:</h2>
			<ul>{Object.entries(country.languages).map(([key, value]) => <li key={value}>{value}</li>)}
			</ul>
			<img alt={country.name.official} src={country.flags.svg} height={200} width={300}></img>
			<h2>Weather in {country.capital}</h2>
			<p>temperature: {weather.main.temp} degrees F</p>
			<p>wind: {weather.wind.speed} mph</p>
		</>
	)
}

export default Country