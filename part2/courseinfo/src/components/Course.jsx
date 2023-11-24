const Header = (props) => {
    return (
        <h2>
        {props.course}
        </h2>
    )
}

const Content = (props) => {
    const courseArray = props.courseList
    return (
    <div>
        {courseArray.map(part =>
            <Part key={part.id} name = {part.name} ameno = {part.exercises} />
        )
        }
    </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.ameno}</p>
    )
}

const Total = (props) => {
    const total = props.courseList.reduce( (i, j) => i + j.exercises,0)
    return (
        <p><b>Number of exercises {total} </b></p>
    )
}

const Course = ( { courseContent }) => {
    
    return (
        <div>
            <Header course = {courseContent.name} />
            <Content courseList = {courseContent.parts} />
            <Total courseList = {courseContent.parts} />
        </div>
    )
}

export default Course