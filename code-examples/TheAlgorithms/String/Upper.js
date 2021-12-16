function upper(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Invalid Input Type')
  }

  let upperString = ''

  for (const char of str) {
    let asciiCode = char.charCodeAt(0)
    if (asciiCode >= 97 && asciiCode <= 122) {
      asciiCode -= 32
    }
    upperString += String.fromCharCode(asciiCode)
  }

  return upperString
}


