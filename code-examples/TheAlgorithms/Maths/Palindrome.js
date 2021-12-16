function PalindromeRecursive(string) {
  // Base case
  if (string.length < 2) return true

  // Check outermost keys
  if (string[0] !== string[string.length - 1]) {
    return false
  }

  return PalindromeRecursive(string.slice(1, string.length - 1))
}

function PalindromeIterative(string) {
  const _string = string
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/,/g, '')
    .replace(/'.'/g, '')
    .replace(/:/g, '')
    .split('')

  // A word of only 1 character is already a palindrome, so we skip to check it
  while (_string.length > 1) {
    if (_string.shift() !== _string.pop()) {
      return false
    }
  }

  return true
}


