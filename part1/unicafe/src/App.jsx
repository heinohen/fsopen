import { useState } from 'react'


const HOnes = props => <h1>{props.text}</h1> 

const Display = ({ name, count }) => {
  return (
    <p>{name} {count}</p>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Average = (props) => {
  const sa = props.value
  const av = 'average'
  return (
    <div>
      {av} {(sa[0].count + sa[1].count + sa[2].count) / sa[3].count}
    </div>
  )
}


function App() {


  const header = 'give feedback'
  const stats = 'statistics'
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const sArray = [
    {name: 'good', count: good},
    {name: 'neutral', count: neutral},
    {name: 'bad', count: bad},
    {name: 'total', count: total}
  ]


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
    <HOnes text = {stats} />
    <Display name= {sArray[0].name} count = {sArray[0].count}/>
    <Display name= {sArray[1].name} count = {sArray[1].count}/>
    <Display name= {sArray[2].name} count = {sArray[2].count}/>
    <Display name= {sArray[3].name} count = {sArray[3].count}/>
    <Average value = {sArray}/>
    </div>
  )
}

export default App
