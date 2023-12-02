
import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Weather = ( { country }) => {

    // tänne asetetaan säätiedot useStatella
    const [weatherMeasurements, setweatherMeasurements] = useState('')
    const capital = country.capital


    // kutsutaan weatherserviceä pääkaupungin mukaan queryllä
    // palauttaa json-olion
    useEffect(() => {
        weatherService
        .getWeather(capital)
        .then(resp => {
            setweatherMeasurements(resp)
    })
    }, [])

    if (weatherMeasurements.length === 0) {
        return (
            null
        )
    }
    return (
        <div>
            <h3>Weather conditions in {capital}:</h3>
            <p>Temperature: {weatherMeasurements.main.temp} °C</p>
            <p>Windspeed: {weatherMeasurements.wind.speed} m/s</p>
            <p>Wind direction: {weatherMeasurements.wind.deg} degrees</p>
            <p>Conditions: {weatherMeasurements.weather[0].description}</p>
            <img src = {`https://openweathermap.org/img/wn/${weatherMeasurements.weather[0].icon}@2x.png`} alt={weatherMeasurements.weather.description} title='säätilat'/>
        </div>
    )
}

export default Weather
