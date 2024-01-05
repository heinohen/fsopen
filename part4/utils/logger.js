

// Tätä moduulia käytetään loggaamiseen ja erroreihin

const info = (...params) => {
  console.log(...params)
}


const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error
}

