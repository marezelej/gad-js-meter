// CheckPascalCase method checks the given string is in PascalCase or not.

// Problem Source & Explanation: https://www.theserverside.com/definition/Pascal-case

function CheckPascalCase(VarName) {
  // firstly, check that input is a string or not.
  if (typeof VarName !== 'string') {
    return new TypeError('Argument is not a string.')
  }

  const pat = /^[A-Z][A-Za-z]*$/
  return pat.test(VarName)
}


