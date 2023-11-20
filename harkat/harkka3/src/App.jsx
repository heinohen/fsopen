import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Display = props => <div>{props.value}</div>

const App = (props) => {
  const [value, setValue] = useState(10)


  const hello = (who) => () => {
    console.log('hello', who)
  }
  
  const setToValue = (newValue) => {
    console.log('value now', value)
    setValue(newValue)
  }

  return (
    <div>
      <Display value = {value} />
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
      <Button handleClick={() => setToValue(1000)} text = 'ja tuhanteen' />
      <Button handleClick={() => setToValue(0)} text = 'zhero' />
      <Button handleClick={() => setToValue(value + 1)} text = 'increment' />
    </div>
  )
}
export default App
