import { useEffect, useState } from 'react'
import  axios  from 'axios'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'




const Persons = ({persons, deletePerson}) => {
  return(
    <ul>
      {persons.map(person =>
        <li key={persons.name}>
          {person.name} , {person.number} 
          <button onClick={() => deletePerson({ person })}>delete</button>
        </li>)}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  
  const [newPerson, setNewPerson] = useState('add name here')
  const [newNumber, setNewNumber] = useState('add number here')
  const [message, setMessage] = useState({ 
    text: null, 
    isError: false
  })

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])



  const addPerson = (event) => {
    const names = persons.map((person) => person.name)
    if(names.includes(newPerson)){
      alert(`${newPerson} is already added to phonebook`)
      event.preventDefault()
      setNewPerson('')
      setNewNumber('')
      return
    }

    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewPerson('')
        setMessage({
          text: `Added ${response.data.name}`,
          isError: false
        })
        setTimeout(() => {
          setMessage({ text: null, isError: false })
        }, 3000)
        
    })


  }


  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  
  const deletePerson = ({ person }) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(setPersons(persons.filter((p) => p.id !== person.id)))
        setMessage({
          text: `Deleted ${person.name}`,
          isError: false
        })
        setTimeout(() => {
          setMessage({ text: null, isError: false })
        }, 3000)
        
    }
  }
  
  

  return (
    <div>
      
      <h2>Phonebook</h2>

      <Notification message={message} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newPerson={newPerson}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber} 
      />

      <h3>Numbers</h3>
      
      <Persons persons={persons} deletePerson={deletePerson}/>

    </div>
  )

}

export default App