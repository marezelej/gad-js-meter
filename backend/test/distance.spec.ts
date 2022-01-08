import test from 'japa'
import service from '@ioc:GAD/Distance'

test.group('Distance function', () => {
  test('Assert that for equal code distance is 0', async (assert) => {
    const code = `function sum(a, b) {return a + b}`

    const distance = await service.distance(code, code)

    assert.equal(0, distance)
  })
  test('Assert that for similar code distance is 0', async (assert) => {
    const aCode = `function sum(a, b) {return a + b}`
    const bCode = `function diff(a, b) {return a - b}`

    const distance = await service.distance(aCode, bCode)

    assert.equal(2, distance)
  })
  test('Assert that for equal cycles distance is 0', async (assert) => {
    const aCode = `function sum(list) {
      let r = 0
      for (let i = 0; i < list.length; i++) {
        r += list[i]
      }
      return r
    }`
    const bCode = `function sum(list) {
      let r = 0
      let i = 0
      while (i < list.length) {
        r += list[i]
        i++
      }
      return r
    }`

    const distance = await service.distance(aCode, bCode)

    assert.equal(distance, 0)
  })
  test('Assert that cycle and recursive code are similar', async (assert) => {
    const aCode = `function factorialRecursive(num) {
      if (num < 0)
        return -1;
      else if (num === 0)
        return 1;
      else {
        return (num * factorialRecursive(num - 1));
      }
    }`
    const bCode = `function factorialWithFor(num) {
      if (num === 0 || num === 1)
        return 1;
      for (let i = num - 1; i >= 1; i--) {
        num *= i;
      }
      return num;
    }`

    const distance = await service.distance(aCode, bCode)

    assert.equal(4, distance)
  })
})
