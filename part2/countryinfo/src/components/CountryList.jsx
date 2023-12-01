
const Country = ( { country }) => {
    return (
            <p>{country.name.common}</p>
    )
}
//<td><button onClick={() => deleteThisPerson(person.id)}>delete</button></td>






//pääkaupunki
//pinta-ala
//kielet - HUOM OBJEKTINA kun ei tiedetä attribuuttien nimiä tai määrää!
const CountryInfo = ( { thisCountry } ) => {
    console.log(thisCountry.area)
    return (
        <div>
            <h2>{thisCountry.name.common}</h2>
            <p>Capital: {thisCountry.capital}</p>
            <p>Area: {thisCountry.area} km²</p>
            <div>
            <ul>
                {Object.keys(thisCountry.languages).map((key) => (
                    <li key={key}>{thisCountry.languages[key]}</li>
                ))}
                </ul>
            </div>
            <img src={thisCountry.flags.png} alt="flag-fin" />  
        </div>
    )
}





const CountryList = ({ countries, showFiltered}) => {
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase()
        .includes(showFiltered.toLowerCase())
    );

    if (showFiltered.length === 0) {
        return (
            <div>Start typing!</div>
        )
    }

    if (filteredCountries.length == countries.length) { return ( <div></div> )}

    else if (filteredCountries.length > 10) {
        return (
            <div>Too many hits!</div>
        )
    }

    else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {

        return (
            <div>
                <p>THIS IS CASE OF 1 -- 10</p>
                {filteredCountries.map(country => 
                    <Country key={country.name.common} country={country} />
                )}
        </div>
        )

    }

    else if (filteredCountries.length == 1) {
        
        const thisCountry = filteredCountries[0]

        return(
            <div>
                <CountryInfo thisCountry={thisCountry} />
            </div>
        )
        }


}
export default CountryList