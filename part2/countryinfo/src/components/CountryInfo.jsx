const CountryInfo = ( { thisCountry } ) => {
    console.log(thisCountry)
    return (
        <div>
            <h2>{thisCountry.name.common}</h2>
            <p>Capital: {thisCountry.capital}</p>
            <p>Area: {thisCountry.area} </p>
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

export default CountryInfo