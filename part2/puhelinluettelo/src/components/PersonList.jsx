const Person = (props) => {
    return (
        <tr>
            <td>{props.person.name}</td>
            <td>{props.person.number}</td>
        </tr>
    )
}


const PersonList = ( {persons} ) => {
    console.log(persons)
    return(
        <div>
            <table>
                <tbody>
                    {persons.map(person => 
                        <Person key={person.id} person={person} />
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default PersonList





