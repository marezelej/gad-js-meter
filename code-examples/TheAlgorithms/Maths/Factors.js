function factorsOfANumber(number) {
  return Array.from(Array(number + 1).keys()).filter(
    (num) => number % num === 0
  )
}

