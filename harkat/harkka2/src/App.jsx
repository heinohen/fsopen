import { useState } from 'react'

/* part c */
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)
  /*
  setTimeout(
  () => setCounter(counter + 1),
  1000)

  console.log('rendering...', counter)
*/

/* part c */
  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  
    const setToZero = () => {
      console.log('resetting to zero, value before', counter)
      setCounter(0)
      setLeft(0)
      setRight(0)
    }
  /* part d */
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])


  const handleLeftClick = () =>{ 
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    
      <div>
        <div>
          <p>/* part c */</p>
        <Display counter = {counter}/>
        <Button handleClick={increaseByOne}
          text="+"/>
        <Button handleClick={decreaseByOne}
        text = "-"/>
        <Button handleClick={setToZero}
        text = "zero"/>
        </div>
        <div>
        <p>/* part d */</p>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
          







        </div>
      </div>
    
    
  )

}

export default App