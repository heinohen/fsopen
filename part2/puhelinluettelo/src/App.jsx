import { useState } from 'react'
import PersonList from './components/PersonList'
import Search from './components/Search'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFiltered, setFiltered] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    /* use old java "-1" trick, could not do it any different... */
    if (persons.findIndex(person => person.name === newName) > -1) {
      /* JS template literal used (same as python fstring)*/
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      /*put it in persons */
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setFiltered(persons.concat(personObject))
    }
    
  }
  /**
   * 
   * @param {} partOfString part of name to search
   */
  const searchForNames = (partOfString) => {
    const filteredArray = persons.filter(person => person.name
      .toLowerCase()
      .includes(partOfString.toLowerCase()))
    setFiltered(filteredArray)
  }
  /**
   * 
   * @param {*} event handler for an search event
   */
  const handleSearch = (event) => {
    searchForNames(event.target.value)
  }

  /**
   * 
   * @param {*} event handler for name change
   */
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  /**
   * 
   * @param {*} event handler for number change
   */
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleChange={handleSearch} />
      <h2>add a new</h2>
      <PersonForm submit = {addPerson} name = {newName} number = {newNumber} handleName = {handleNameChange} handleNumber = {handleNumberChange} />
      <h2>Numbers</h2>
      <div>
      <PersonList persons = {showFiltered} />
      </div>
    </div>
  )
}
export default App
