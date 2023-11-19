
const Header = (props) => {
  return (
    <h1>{props.hed}</h1>
  )
}

const Content = (props) => {
  return (
    <p>{props.name} {props.length}</p>
  )
}

const Total = (t) => {
  return (
    <p>Number of exercises {t.l}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const total = exercises1 + exercises2 + exercises3

  const contentList = [
    {c:'Fundamentals of React', l: 10 },
    {c: 'Using props to pass data',l:7},
    {c: 'State of a component', l:14}
  ]

  return (
    <div>
      
      <Header hed = {course} />
      
      
      {/*       
      <Content name = {part1} length = {exercises1}/>
      <Content name = {part2} length = {exercises2}/>
      <Content name = {part3} length = {exercises3}/>
       */}      
      
      
      <Total l = {total} />
    </div>
  )
}

export default App