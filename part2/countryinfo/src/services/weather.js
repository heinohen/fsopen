import axios from 'axios'

// pohja api-kutsulle
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
// api-avain, määritellään ympäristömuuttujana
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = ( capital ) => {

    const unit = 'metric'
    // pohja apikutsulle, capital = pääkaupunki, units asetettu metreiksi
    const request =  axios.get(`${baseUrl}?q=${capital}&appid=${api_key}&units=${unit}`)
    return request.then(response => response.data)
}

export default {
    getWeather
}