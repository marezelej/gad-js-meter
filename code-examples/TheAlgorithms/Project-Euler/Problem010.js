// https://projecteuler.net/problem=10

function isPrime(number) {
  if (number === 2) return true
  if (number % 2 === 0) return false

  for (let j = 3; j * j <= number; j += 2) {
    if (number % j === 0) {
      return false
    }
  }
  return true
}

function calculateSumOfPrimeNumbers(maxNumber) {
  let sum = 0
  for (let i = maxNumber - 1; i >= 2; i--) {
    if (isPrime(parseInt(i)) === true) {
      sum += i
    }
  }
  return sum
}

