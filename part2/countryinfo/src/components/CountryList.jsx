import CountryInfo from "./CountryInfo"

const Country = ( { country, tamanappi }) => {
    console.log('countries listed<------')
    return (
        <div className="row">
            <p>{country.name.common}</p><button onClick={() => tamanappi(country.name.common)}>Show info</button>
        </div>
    )   
}

const CountryList = ({ countries, showFiltered, tamanappi}) => {3
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase()
        .includes(showFiltered.toLowerCase())
    );

    if (showFiltered.length === 0) {
        return (
            <div>Start typing!</div>
        )
    }
    // jos ei asetettuna mitään suodatinta, ei näytetä maita
    if (filteredCountries.length == countries.length) { return ( <div></div> )}

    else if (filteredCountries.length > 10) {
        return (
            <div>Too many hits!</div>
        )
    }
    //
    else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {

        return (
            <div>
                {filteredCountries.map(country => 
                    <Country key={country.name.ccn3} country={country} tamanappi={tamanappi} />
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