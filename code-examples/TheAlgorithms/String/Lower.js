function lower(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Invalid Input Type')
  }

  let lowerString = ''

  for (const char of str) {
    let asciiCode = char.charCodeAt(0)
    if (asciiCode >= 65 && asciiCode <= 90) {
      asciiCode += 32
    }
    lowerString += String.fromCharCode(asciiCode)
  }

  return lowerString
}


