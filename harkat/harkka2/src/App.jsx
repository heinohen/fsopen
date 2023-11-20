import { useState } from 'react'

const App = () => {
  
  const [ counter, setCounter ] = useState(0)
  /*
  setTimeout(
  () => setCounter(counter + 1),
  1000)

  console.log('rendering...', counter)
*/
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)
  const handleClick = () => {
    console.log('clicked')
  }
    
  return (
      <div>
        <div>{counter}</div>
        <button onClick={increaseByOne}>+</button>
        <button onClick={decreaseByOne}>-</button>
        <button onClick={setToZero}>zero</button>
      </div>
  )

}

export default App