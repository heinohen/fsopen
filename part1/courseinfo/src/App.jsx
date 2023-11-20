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
      <Part name = {courseArray[0].name} ameno = {courseArray[0].exercises} />
      <Part name = {courseArray[1].name} ameno = {courseArray[1].exercises} />
      <Part name = {courseArray[2].name} ameno = {courseArray[2].exercises} />
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
  var totals = courseArray[0].exercises + courseArray[1].exercises + courseArray[2].exercises
  return (
    <p>Number of exercises {totals}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name} />
      <Content courseList = {course.parts} />
      <Total courseList = {course.parts} />
    </div>
  )
}

export default App