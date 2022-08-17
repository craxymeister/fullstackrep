import { useState } from 'react'


const App = () => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,})

  const addPoints = () => {
    const newPoint = {
      ...points, [selected]: points[selected] + 1

    }
    setPoints(newPoint)
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  
  
  function randomNumberInRange(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 

  const [mostVoted, maxValue] = Object.entries(points).reduce((acc,cur) => cur[1] > acc[1] ? cur : acc)

  const handleClick = () => {
    setSelected(randomNumberInRange(1,anecdotes.length))

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      <p>has {points[selected]} votes</p>
      <button onClick={addPoints}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
    </div>
  )
}

export default App