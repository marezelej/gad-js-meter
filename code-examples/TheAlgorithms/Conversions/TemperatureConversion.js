// This files has functions to convert different temperature units
// Functions take temperature value as a argument and returns corresponding converted value

function celsiusToFahrenheit(celsius) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Celsius
  // Wikipedia reference: https://en.wikipedia.org/wiki/Fahrenheit
  return Math.round(((celsius) * 9 / 5) + 32)
}

function celsiusToKelvin(celsius) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Celsius
  // Wikipedia reference: https://en.wikipedia.org/wiki/Kelvin
  return Math.round((celsius) + 273.15)
}

function celsiusToRankine(celsius) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Celsius
  // Wikipedia reference: https://en.wikipedia.org/wiki/Rankine_scale
  return Math.round(((celsius) * 9 / 5) + 491.67)
}

function fahrenheitToCelsius(fahrenheit) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Fahrenheit
  // Wikipedia reference: https://en.wikipedia.org/wiki/Celsius
  return Math.round(((fahrenheit) - 32) * 5 / 9)
}

function fahrenheitToKelvin(fahrenheit) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Fahrenheit
  // Wikipedia reference: https://en.wikipedia.org/wiki/Kelvin
  return Math.round((((fahrenheit) - 32) * 5 / 9) + 273.15)
}

function fahrenheitToRankine(fahrenheit) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Fahrenheit
  // Wikipedia reference: https://en.wikipedia.org/wiki/Rankine_scale
  return Math.round((fahrenheit) + 459.67)
}

function kelvinToCelsius(kelvin) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Kelvin
  // Wikipedia reference: https://en.wikipedia.org/wiki/Celsius
  return Math.round((kelvin) - 273.15)
}

function kelvinToFahrenheit(kelvin) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Kelvin
  // Wikipedia reference: https://en.wikipedia.org/wiki/Fahrenheit
  return Math.round((((kelvin) - 273.15) * 9 / 5) + 32)
}

function kelvinToRankine(kelvin) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Kelvin
  // Wikipedia reference: https://en.wikipedia.org/wiki/Rankine_scale
  return Math.round(((kelvin) * 9 / 5))
}

function rankineToCelsius(rankine) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Rankine_scale
  // Wikipedia reference: https://en.wikipedia.org/wiki/Celsius
  return Math.round(((rankine) - 491.67) * 5 / 9)
}

function rankineToFahrenheit(rankine) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Rankine_scale
  // Wikipedia reference: https://en.wikipedia.org/wiki/Fahrenheit
  return Math.round((rankine) - 459.67)
}

function rankineToKelvin(rankine) {
  // Wikipedia reference: https://en.wikipedia.org/wiki/Rankine_scale
  // Wikipedia reference: https://en.wikipedia.org/wiki/Kelvin
  return Math.round(((rankine) * 5 / 9))
}

function reaumurToKelvin(reaumur) {
  // Reference:- http://www.csgnetwork.com/temp2conv.html
  return Math.round(((reaumur) * 1.25 + 273.15))
}

function reaumurToFahrenheit(reaumur) {
  // Reference:- http://www.csgnetwork.com/temp2conv.html
  return Math.round(((reaumur) * 2.25 + 32))
}

function reaumurToCelsius(reaumur) {
  // Reference:- http://www.csgnetwork.com/temp2conv.html
  return Math.round(((reaumur) * 1.25))
}

function reaumurToRankine(reaumur) {
  // Reference:- http://www.csgnetwork.com/temp2conv.html
  return Math.round(((reaumur) * 2.25 + 32 + 459.67))
}
