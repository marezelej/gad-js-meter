/*
  Calculate the area of various shapes
*/

function surfaceAreaCube(side) {
  validateNumericParam(side, 'side')
  return 6 * side ** 2
}

function surfaceAreaSphere(radius) {
  validateNumericParam(radius, 'radius')
  return 4.0 * Math.PI * radius ** 2.0
}

/**
 * @function areaRectangle
 * @description Calculate the area of a rectangle.
 * @param {Integer} length - Integer
 * @param {Integer} width - Integer
 * @return {Integer} - width * length
 * @see [areaRectangle](https://en.wikipedia.org/wiki/Area#Quadrilateral_area)
 * @example areaRectangle(4) = 16
 */
const areaRectangle = (length, width) => {
  validateNumericParam(length, 'Length')
  validateNumericParam(width, 'Width')
  return width * length
}

function areaSquare(side) {
  validateNumericParam(side, 'square side')
  return side ** 2
}

/**
 * @function areaTriangle
 * @description Calculate the area of a triangle.
 * @param {Integer} base - Integer
 * @param {Integer} height - Integer
 * @return {Integer} - base * height / 2.
 * @see [areaTriangle](https://en.wikipedia.org/wiki/Area#Triangle_area)
 * @example areaTriangle(1.66, 3.44) = 2.8552
 */
const areaTriangle = (base, height) => {
  validateNumericParam(base, 'Base')
  validateNumericParam(height, 'Height')
  return (base * height) / 2.0
}

/**
 * @function areaTriangleWithAllThreeSides
 * @description Calculate the area of a triangle with the all three sides given.
 * @param {Integer} side1 - Integer
 * @param {Integer} side2 - Integer
 * @param {Integer} side3 - Integer
 * @return {Integer} - area of triangle.
 * @see [areaTriangleWithAllThreeSides](https://en.wikipedia.org/wiki/Heron%27s_formula)
 * @example areaTriangleWithAllThreeSides(5, 6, 7) = 14.7
 */
const areaTriangleWithAllThreeSides = (side1, side2, side3) => {
  validateNumericParam(side1, 'side1')
  validateNumericParam(side2, 'side2')
  validateNumericParam(side3, 'side3')
  if (
    side1 + side2 <= side3 ||
    side1 + side3 <= side2 ||
    side2 + side3 <= side1
  ) {
    throw new TypeError('Invalid Triangle sides.')
  }
  // Finding Semi perimeter of the triangle using formula
  const semi = (side1 + side2 + side3) / 2

  // Calculating the area of the triangle
  const area = Math.sqrt(
    semi * (semi - side1) * (semi - side2) * (semi - side3)
  )
  return Number(area.toFixed(2))
}

/**
 * @function areaParallelogram
 * @description Calculate the area of a parallelogram.
 * @param {Integer} base - Integer
 * @param {Integer} height - Integer
 * @return {Integer} - base * height
 * @see [areaParallelogram](https://en.wikipedia.org/wiki/Area#Dissection,_parallelograms,_and_triangles)
 * @example areaParallelogram(5, 6) = 24
 */
const areaParallelogram = (base, height) => {
  validateNumericParam(base, 'Base')
  validateNumericParam(height, 'Height')
  return base * height
}

/**
 * @function areaTrapezium
 * @description Calculate the area of a trapezium.
 * @param {Integer} base1 - Integer
 * @param {Integer} base2 - Integer
 * @param {Integer} height - Integer
 * @return {Integer} - (1 / 2) * (base1 + base2) * height
 * @see [areaTrapezium](https://en.wikipedia.org/wiki/Trapezoid)
 * @example areaTrapezium(5, 12, 10) = 85
 */
const areaTrapezium = (base1, base2, height) => {
  validateNumericParam(base1, 'Base One')
  validateNumericParam(base2, 'Base Two')
  validateNumericParam(height, 'Height')
  return (1 / 2) * (base1 + base2) * height
}

function areaCircle(radius) {
  validateNumericParam(radius, 'Radius')
  return Math.PI * radius ** 2
}

/**
 * @function areaRhombus
 * @description Calculate the area of a rhombus.
 * @param {Integer} diagonal1 - Integer
 * @param {Integer} diagonal2 - Integer
 * @return {Integer} - (1 / 2) * diagonal1 * diagonal2
 * @see [areaRhombus](https://en.wikipedia.org/wiki/Rhombus)
 * @example areaRhombus(12, 10) = 60
 */
const areaRhombus = (diagonal1, diagonal2) => {
  validateNumericParam(diagonal1, 'diagonal one')
  validateNumericParam(diagonal2, 'diagonal two')
  return (1 / 2) * diagonal1 * diagonal2
}

const validateNumericParam = (param, paramName = 'param') => {
  if (typeof param !== 'number') {
    throw new TypeError('The ' + paramName + ' should be type Number')
  } else if (param < 0) {
    throw new Error('The ' + paramName + ' only accepts non-negative values')
  }
}
