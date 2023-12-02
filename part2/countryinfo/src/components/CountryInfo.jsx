import Weather from "./WeatherData"

const CountryInfo = ( { thisCountry } ) => {

    // Maan kielet objecteina, koska ei tiedetä lukumäärää tai muuttujien tietoja
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
            <div className="flag-container">
                <img src={thisCountry.flags.png} alt="flag-fin" />  
            </div>
            <div>
                <Weather country = {thisCountry} />
            </div>
        </div>
    )
}

export default CountryInfo