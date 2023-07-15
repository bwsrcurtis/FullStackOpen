import personService from './services/persons'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Notification from './Components/Notification'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
          .catch(error => {
            setErrorMessage(`${persons[index].name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        const personsCopy = [...persons]
        personsCopy[index].number = newNumber
        setPersons(personsCopy)
        setSuccessMessage(`Updated ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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
      setSuccessMessage(`Added ${newName}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }

  const deleteEntry = (person) => {
    console.log(person.id)
    if (window.confirm("Are you sure you want to delete?")) {
      personService.deleteEntry(person)
        .catch(error => {
          setErrorMessage(`${person.name} was already removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(e => e.id !== person.id))
        })
      console.log(person.id)
      const updatedPersons = persons.filter(e =>
        e.id !== person.id)
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
      <Notification successMessage={successMessage} errorMessage={errorMessage}></Notification>
      <Filter handleFilterChange={handleFilterChange} filterName={filterName}></Filter>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber}></PersonForm>

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deleteEntry={deleteEntry}></Persons>
    </div>
  )
}

export default App