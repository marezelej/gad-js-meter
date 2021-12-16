function alphaNumericPlaindrome(str) {
  // removing all the special characters and turning everything to lowercase
  const newStr = str.replace(/[^a-zA-Z0-9]*/g, '').toLowerCase()

  for (let i = 0; i < newStr.length; i++) {
    if (newStr[i] !== newStr[newStr.length - 1 - i]) {
      return false
    }
  }

  return true
}


