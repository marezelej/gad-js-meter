function countVowels(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Input should be a string')
  }
  const vowels = new Set(['a', 'e', 'i', 'o', 'u'])
  let count = 0
  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase()
    if (vowels.has(char)) {
      count++
    }
  }
  return count
}


