

const Filter = ({ handleFilterChange, filterName }) => {
	return (

		<p>filter shown with <input onChange={handleFilterChange} value={filterName}></input></p>
	)
}

export default Filter