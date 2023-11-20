import { useState } from 'react'

/* part c */
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({handleClick, text}) => {
  console.log('props value is', handleClick, text)
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


/* part d */

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        The app is used be pressing buttons.
      </div>
    )
  }
  return (
    <div>
      Button press history: {props.allClicks.join(' ')}
    </div>
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
  const [total, setTotal] = useState(0)

  const handleLeftClick = () =>{ 
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
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
        <Button handleClick={handleLeftClick} text = 'left'/>
        <Button handleClick={handleRightClick} text = 'right'/>
        {right}
        <p>total {total}</p>
        <History allClicks = {allClicks}/>

          







        </div>
      </div>
    
    
  )

}

export default App