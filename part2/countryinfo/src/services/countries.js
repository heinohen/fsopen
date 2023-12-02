import axios from 'axios'

// Siirrä palvelimen kanssa kommunikoinnista vastaava toiminnallisuus omaan moduuliin
// tämän osan materiaalissa olevan esimerkin tapaan.

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request =  axios.get(baseUrl)
    return request.then(response => response.data)
}



export default {
    getAll,
}