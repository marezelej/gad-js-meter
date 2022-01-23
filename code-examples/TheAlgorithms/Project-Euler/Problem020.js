function factorialDigitSum(n) {
  // Consider each digit*10^exp separately, right-to-left ([units, tens, ...]).
  const digits = [1]

  for (let x = 2; x <= n; x++) {
    let carry = 0
    for (let exp = 0; exp < digits.length; exp++) {
      const prod = digits[exp] * x + carry
      carry = Math.floor(prod / 10)
      digits[exp] = prod % 10
    }
    while (carry > 0) {
      digits.push(carry % 10)
      carry = Math.floor(carry / 10)
    }
  }

  // (digits are reversed but we only want the sum so it doesn't matter)

  return digits.reduce((prev, current) => prev + current, 0)
}


