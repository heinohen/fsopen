import { useState } from 'react'

const HOnes = (props) => {
  return (
    <div>
      <h1>{props.info}</h1>
      </div>
  )
}

const Upper = (props) => {
  return(
    <div>
      <div>
        {props.text}
      </div>
      <div>
        has {props.votes} votes
      </div>
    </div>
  )
}

const Lower = (props) => {
  /*works here, might not work in larger arrays */
  const max = Math.max(...props.pointsArray)
  const indexOfMax = [...props.pointsArray].indexOf(max)

  return (
    <div>
    <div>
      {props.anecArray[indexOfMax]}
    </div>
    <div>
      has {max} votes
    </div>
    </div>
  )

}

const Button = (props) => {
  return (

      <button onClick={props.handle}>{props.text}</button>

  )
}

const App = () => {

  

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))


  const voteThis = () => {
    const copyOfpoints = [...points]
    copyOfpoints[selected] += 1
    setPoints(copyOfpoints)
    console.log(points)
  }
  
  const nextText = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0) + 0))
  }
  /*

  args:

  info = textfield: string
  text = selected text from anecdotes array: string
  votes = selected integer from points array: int
  handle = function
  text = textfield: string
  anecArray = gives anecdotes to Lower component
  pointsArray = gives points to Lower component
  


  */
  return (
    <div>
      <HOnes info = 'Anecdote of the day'/>
      <Upper text = {anecdotes[selected]} votes = {points[selected]} />
      <Button handle = {voteThis} text = 'vote' />
      <Button handle = {nextText} text = 'next anecdote' />
      <HOnes info = 'Anecdote with most votes' />
      <Lower anecArray = {anecdotes} pointsArray = {points} />
    </div>
  )
}

export default App