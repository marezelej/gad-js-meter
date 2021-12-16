// CheckSnakeCase method checks the given string is in snake_case or not.

// Problem Source & Explanation: https://en.wikipedia.org/wiki/Naming_convention_(programming)

function checkSnakeCase(varName) {
  // firstly, check that input is a string or not.
  if (typeof varName !== 'string') {
    throw new TypeError('Argument is not a string.')
  }

  const pat = /(.*?)_([a-zA-Z])*/
  return pat.test(varName)
}


