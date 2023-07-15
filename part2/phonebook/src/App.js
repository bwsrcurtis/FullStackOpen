import personService from './services/persons'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data);
      })

  }, [])


  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const info = { name: newName, number: newNumber };
        const index = persons.findIndex(x => x.name === newName)
        personService.update(persons[index].id, info)
        const personsCopy = [...persons]
        personsCopy[index].number = newNumber
        setPersons(personsCopy)
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      const info = { name: newName, number: newNumber };
      setPersons(persons.concat(info))
      personService.create(info)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          console.log(response)
        })
    }
  }

  const deleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      personService.deleteEntry(id)
      console.log(id)
      const updatedPersons = persons.filter(e =>
        e.id !== id)
      setPersons(updatedPersons)
    }
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
      <Persons persons={filteredPersons} deleteEntry={deleteEntry}></Persons>
    </div>
  )
}

export default App