const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  const courseArray = props.courseList
  return (
    <div>
      <Part name = {courseArray[0].name} ameno = {courseArray[0].amount} />
      <Part name = {courseArray[1].name} ameno = {courseArray[1].amount} />
      <Part name = {courseArray[2].name} ameno = {courseArray[2].amount} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.ameno}</p>
  )
}

const Total = (props) => {
  const courseArray = props.courseList
  var totals = courseArray[0].amount + courseArray[1].amount + courseArray[2].amount
  return (
    <p>Number of exercises {totals}</p>
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

  const courseList = [
    {name: 'Fundamentals of React', amount: 10},
    {name: 'Using props to pass data', amount: 7},
    {name: 'State of a component', amount: 14}
  ]

  return (
    <div>
      <Header course = {course} />
      <Content courseList = {courseList} />
      <Total courseList = {courseList} />
    </div>
  )
}

export default App