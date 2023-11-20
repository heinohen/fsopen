import { useState } from 'react'


const HOnes = props => <h1>{props.text}</h1> 



const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({name, parts}) => {
  return(
    <div>
      <h1>{name}</h1>
      <p>{parts[0].name} {parts[0].count}</p>
      <p>{parts[1].name} {parts[1].count}</p>
      <p>{parts[2].name} {parts[2].count}</p>
      <p>{parts[3].name} {parts[3].count}</p>
      <p>average {(parts[0].count - parts[2].count) / parts[3].count}</p>
      <p>positive {parts[0].count / parts[3].count} %</p>
    </div>
  )
}

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


  const header = 'give feedback'
  const stats = 'statistics'
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)

  
  const sArray = {
    name: 'statistics',
    parts: [
      {name: 'good', count: good},
      {name: 'neutral', count: neutral},
      {name: 'bad', count: bad},
      {name: 'total', count: total}
    ]
  }


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
