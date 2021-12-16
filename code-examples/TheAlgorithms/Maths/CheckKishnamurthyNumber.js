/*
    Problem statement and Explanation : https://www.geeksforgeeks.org/check-if-a-number-is-a-krishnamurthy-number-or-not-2/

    krishnamurthy number is a number the sum of the all factorial of the all dights is equal to the number itself.
    145 => 1! + 4! + 5! = 1  + 24 + 120 = 145
*/

// factorial utility method.
function factorial(n) {
  let fact = 1
  while (n !== 0) {
    fact = fact * n
    n--
  }
  return fact
}

function CheckKishnamurthyNumber(number) {
  // firstly, check that input is a number or not.
  if (typeof number !== 'number') {
    return new TypeError('Argument is not a number.')
  }
  // create a variable to store the sum of all digits factorial.
  let sumOfAllDigitFactorial = 0
  // convert the number to string for convenience.
  let newNumber = number
  // Extract number digits using the remainder method.
  while (newNumber > 0) {
    const lastDigit = newNumber % 10
    // calculate each digit factorial.
    sumOfAllDigitFactorial += factorial(lastDigit)
    newNumber = Math.floor(newNumber / 10)
  }
  // if the sumOftheFactorial is equal to the given number it means the number is a Krishnamurthy number.
  return sumOfAllDigitFactorial === number
}


