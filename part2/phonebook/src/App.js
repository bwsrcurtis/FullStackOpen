import Persons from './Components/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: 'Arto Hellas',
      number: '888-888-8888'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const info = { id: persons.length, number: newNumber, name: newName };
      setPersons(persons.concat(info))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredPersons = persons.filter(e => {
    return (
      e.name.toLowerCase().includes(filterName.toLowerCase())
      ||
      e.number.toLowerCase().includes(filterName.toLowerCase())
    )
  })

  const handleFilterChange = (event) => {
    setfilterName(event.target.value)

  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filterName={filterName}></Filter>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber}></PersonForm>

      <h2>Numbers</h2>
      <Persons persons={filteredPersons}></Persons>
    </div>
  )
}

export default App