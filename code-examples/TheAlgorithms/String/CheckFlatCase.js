// checkFlatCase method checks if the given string is in flatcase or not. Flatcase is a convention
// where all letters are in lowercase, and there are no spaces between words.
// thisvariable is an example of flatcase. In camelCase it would be thisVariable, snake_case this_variable and so on.

// Problem Source & Explanation: https://en.wikipedia.org/wiki/Naming_convention_(programming)

function checkFlatCase(varname) {
  // firstly, check that input is a string or not.
  if (typeof varname !== 'string') {
    return new TypeError('Argument is not a string.')
  }

  const pat = /^[a-z]*$/
  return pat.test(varname)
}


