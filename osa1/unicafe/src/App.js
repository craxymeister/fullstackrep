import React, { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={props.value}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good - bad)/all
    const positives = ((good / all) * 100) + " %"

    if (good === 0 && neutral === 0) {
      return (
      <div>
        <br />
        No feedback yet
      </div>
      )
    } else

    return (
        <div>
            <div><h1>statistics</h1></div>
            <table>
              <tr>
                <td><StatisticLine text="good"/></td>
                <td><StatisticLine value={good}/></td>
              </tr>
              <tr>
                <td><StatisticLine text="neutral"/></td>
                <td><StatisticLine value={neutral}/></td>
              </tr>
              <tr>
                <td><StatisticLine text="bad"/></td>
                <td><StatisticLine value={bad}/></td>
              </tr>
              <tr>
                <td><StatisticLine text="all"/></td>
                <td><StatisticLine value={all}/></td>
              </tr>
              <tr>
                <td><StatisticLine text="average"/></td>
                <td><StatisticLine value={average}/></td>
              </tr>
              <tr>
                <td><StatisticLine text="positives"/></td>
                <td><StatisticLine value={positives}/></td>
              </tr>
            
            </table>
        </div>
    )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {setGood(good + 1)}
  const handleNeutralClick = () => {setNeutral(neutral + 1)}
  const handleBadClick = () => {setBad(bad + 1)}

  return (
    <div>
    <div>
      <h1>Give feedback</h1>
    </div>
    <div>
        <Button value={handleGoodClick} text="good" />
        <Button value={handleNeutralClick} text="neutral" />
        <Button value={handleBadClick} text="bad" />
    </div>
    <div>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    </div>
  )
}




export default App