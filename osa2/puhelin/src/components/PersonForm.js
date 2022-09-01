const PersonForm = ({addPerson, newPerson, handlePersonChange, handleNumberChange, newNumber}) => {
    return (
      <form onSubmit={addPerson}>
      <div>name: <input value={newPerson} onChange={handlePersonChange} />
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      </div>
      <div><button type="submit">add</button></div>
    </form>
    )
  } 

export default PersonForm