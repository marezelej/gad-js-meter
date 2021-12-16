/**
 Problem Statement and Explanation :
 Triangular  => https://en.wikipedia.org/wiki/Triangular_number
 Tetrahedral => https://en.wikipedia.org/wiki/Tetrahedral_number
 Pentatope   => https://en.wikipedia.org/wiki/Pentatope_number

 Example:
 Triangular  => (0, 1, 3, 6, 10, 15, 21, 28, 36, 45)
 Tetrahedral => (1, 4, 10, 20, 35, 56, 84, 120, 165,)
 Pentatope   => (1, 5, 15, 35, 70, 126, 210, 330, 495)
 */

function isTriangular(number) {
  for (let i = 0; i <= number; i++) {
    if ((i * (i + 1)) / 2 === number) {
      return true
    } else if ((i * (i + 1)) / 2 > number) {
      return false
    }
  }
  return false
}

function isTetrahedral(number) {
  for (let i = 1; i <= number; i++) {
    if ((i * (i + 1) * (i + 2)) / 6 === number) {
      return true
    } else if ((i * (i + 1) * (i + 2)) / 6 > number) {
      return false
    }
  }
  return false
}
function isPentatope(number) {
  for (let i = 1; i <= number; i++) {
    if ((i * (i + 1) * (i + 2) * (i + 3)) / 24 === number) {
      return true
    } else if ((i * (i + 1) * (i + 2) * (i + 3)) / 24 > number) {
      return false
    }
  }
  return false
}




