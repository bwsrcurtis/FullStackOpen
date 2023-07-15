import Country from "./Country"

const Countries = ({ countries, toggleShow }) => {
	if (countries.length <= 10 && countries.length > 1) {
		return (
			<>{countries.map(country => (
				<div key={country.name.official}>
					<p>{country.name.official}</p>
					<button onClick={() => toggleShow(country.name.official)}>show</button>
				</div>
			))
			}
			</>
		)
	}
	if (countries.length > 10) {
		return (
			<p>Too many countries</p>
		)
	}

	if (countries.length === 1) {
		if (countries.length === 1) {
			return (
				<Country country={countries[0]}></Country>
			)
		}
	}

	return (
		<p>No Matching Countries</p>
	)
}

export default Countries