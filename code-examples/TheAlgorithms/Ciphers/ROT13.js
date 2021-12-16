function ROT13(text) {
  const originalCharacterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const toBeMappedCharaterList = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'
  const index = x => originalCharacterList.indexOf(x)
  const replace = x => index(x) > -1 ? toBeMappedCharaterList[index(x)] : x
  return text.split('').map(replace).join('')
}



// > ROT13('The quick brown fox jumps over the lazy dog')
// 'Gur dhvpx oebja sbk whzcf bire gur ynml qbt'
