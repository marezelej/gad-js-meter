// CheckKebabCase method checks the given string is in kebab-case or not.

// Problem Source & Explanation: https://en.wikipedia.org/wiki/Naming_convention_(programming)

function CheckKebabCase(varName) {
  // firstly, check that input is a string or not.
  if (typeof varName !== 'string') {
    return new TypeError('Argument is not a string.')
  }

  const pat = /(\w+)-(\w)([\w-]*)/
  return pat.test(varName) && !varName.includes('_')
}


