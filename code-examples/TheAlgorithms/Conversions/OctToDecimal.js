function octalToDecimal (num) {
  let dec = 0
  let base = 1
  while (num > 0) {
    const r = num % 10
    num = Math.floor(num / 10)
    dec = dec + (r * base)
    base = base * 8
  }
  return dec
}



// > octalToDecimal(56)
// 46

// > octalToDecimal(2365)
// 1269
