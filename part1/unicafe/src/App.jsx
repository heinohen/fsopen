import { useState } from 'react'

/*header*/
const HOnes = props => <h1>{props.text}</h1> 


/*Button Handles the functionality of each feedback submission button.*/
const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}
/*Refactor your application so that displaying the statistics is extracted into its own Statistics component.
The state of the application should remain in the App root component.*/
const Statistics = ({name, parts}) => {
  return(
    <div>
      <h1>{name}</h1>
      <StatisticLine name = {parts[0].name} value = {parts[0].count} />
      <StatisticLine name = {parts[1].name} value = {parts[1].count} />
      <StatisticLine name = {parts[2].name} value = {parts[2].count} />
      <StatisticLine name = {parts[3].name} value = {parts[3].count} />
      <StatisticLine name = "average" value = {(parts[0].count - parts[2].count) / parts[3].count} />
      <StatisticLine name = "positive" value = {parts[0].count / parts[3].count} />
    </div>
  )
}

/*StatisticLine for displaying a single statistic, e.g. the average score.*/
const StatisticLine = ({name, value}) => {
  if (name === 'positive') {
    return <p>{name} {value} %</p>
  }
  return (
    <p>{name} {value}</p>
  )
}

/*Change your application to display statistics only once feedback has been gathered.*/
const History = (props) => {
  const sa = props.handleHistory
  if (sa.parts[3].count === 0) {
    return (
      <div>
        <h1>{sa.name}</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <Statistics name = {sa.name} parts = {sa.parts} />
  )
}


function App() {

  /*variables*/
  const header = 'give feedback'
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  const sArray = {
    name: 'statistics',
    parts: [
      {name: 'good', count: good},
      {name: 'neutral', count: neutral},
      {name: 'bad', count: bad},
      {name: 'total', count: total}
    ]
  }

  /*click handlers*/
  const handleGoodClick = () =>{ 
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () =>{ 
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }

  const handleBadClick = () =>{ 
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + neutral + good)
  }



  return (
    <div>
    <HOnes text = {header} />
    <Button handleClick={handleGoodClick} text = 'good'/>
    <Button handleClick={handleNeutralClick} text = 'neutral'/>
    <Button handleClick={handleBadClick} text = 'bad'/>
    <History handleHistory = {sArray} />
    </div>
  )
}

export default App
