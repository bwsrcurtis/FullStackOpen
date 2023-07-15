

const Persons = ({ persons, deleteEntry }) => {
	return (
		<>
			{persons.map(person => (
				<div key={person.id}>
					<p>{person.name} {person.number}</p>
					<button onClick={() => deleteEntry(person)}>delete</button>
				</div>
			))}
		</>
	)
}

export default Persons