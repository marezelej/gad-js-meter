import test from 'japa'
import MetricVectorsDistance from 'App/Distance/Manhattan/MetricVectorsDistance'

test.group('Code Vector parce', () => {
  test('Test function without loops and variables', async (assert) => {
    const code = `function sum(a, b) {return a + b}`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(vector.loopCount, 0)
    assert.equal(vector.paramsCount, 2)
    assert.equal(vector.maxTreeDeep, 6)
    assert.equal(vector.ifCount, 0)
  })
  test('Test function loops are count', async (assert) => {
    const code = `function sum3Times(list) {
      let r = 0
      for (let i = 0; i < list.length; i++) {
        r += list[i]
      }
      for (let i = 0; i < list.length; i++) {
        r += list[i]
      }
      let i = 0
      while (i < list.length) {
        r += list[i]
        i++
      }
      return r
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(vector.loopCount, 3)
    assert.equal(vector.paramsCount, 1)
    assert.equal(vector.maxTreeDeep, 9)
    assert.equal(vector.ifCount, 0)
  })
  test('Test function recursion are count as loops', async (assert) => {
    const code = `function factorialRecursive(num) {
      if (num < 0)
        return -1;
      else if (num === 0)
        return 1;
      else {
        return (num * factorialRecursive(num - 1));
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(vector.loopCount, 1)
    assert.equal(vector.paramsCount, 1)
    assert.equal(vector.maxTreeDeep, 11)
    assert.equal(vector.ifCount, 2)
  })
  test('Test function has arrays', async (assert) => {
    const code = `function withArray() {
      return [1, 2, 3]
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(vector.hasArrays, 1)
  })
  test('Test function sum operator count', async (assert) => {
    const code = `function sumop() {
      return a + b 
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(vector.sumOpCount, 1)
  })
  test('Test function diff operator count', async (assert) => {
    const code = `function diffop() {
      return a - b - c
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(vector.diffOpCount, 2)
  })
  test('Test function div operator count', async (assert) => {
    const code = `function divop() {
      return a / c
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(vector.divOpCount, 1)
  })
  test('Test function prod operator count', async (assert) => {
    const code = `function prodop() {
      return a * c
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(vector.prodOpCount, 1)
  })
  test('Test function with 0 nested loops', async (assert) => {
    const code = `function prodop() {
      for (let i = 0; i < 4; i++) {
        console.log('Aprobados')
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(1, vector.simpleLoopCount)
    assert.equal(0, vector.doubleLoopCount)
    assert.equal(0, vector.multipleLoopCount)
  })
  test('Test function with 1 nested loops', async (assert) => {
    const code = `function prodop() {
      for (let i = 0; i < 4; i++) {
        for (let i = 0; i < 4; i++) {
          console.log('Aprobados')
        }
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(1, vector.simpleLoopCount)
    assert.equal(1, vector.doubleLoopCount)
    assert.equal(0, vector.multipleLoopCount)
  })
  test('Test function with multiple nested loops', async (assert) => {
    const code = `function prodop() {
      for (let i = 0; i < 4; i++) {
        for (let i = 0; i < 4; i++) {
          for (let i = 0; i < 4; i++) {
            for (let i = 0; i < 4; i++) {
              console.log('Aprobados')
            }
          }
        }
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(1, vector.simpleLoopCount)
    assert.equal(1, vector.doubleLoopCount)
    assert.equal(2, vector.multipleLoopCount)
  })
  test('Test function with 1 nested loops and 0 nested loop', async (assert) => {
    const code = `function prodop() {
      for (let i = 0; i < 4; i++) {
        for (let i = 0; i < 4; i++) {
          console.log('Aprobados')
        }
        for (let i = 0; i < 4; i++) {
          console.log('Aprobados')
        }
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(1, vector.simpleLoopCount)
    assert.equal(2, vector.doubleLoopCount)
    assert.equal(0, vector.multipleLoopCount)
  })
  test('Test function with 0 nested if', async (assert) => {
    const code = `function iftest() {
      if (true) {
        console.log('Aprobados')
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(1, vector.simpleIfCount)
    assert.equal(0, vector.doubleIfCount)
    assert.equal(0, vector.multipleIfCount)
  })
  test('Test function with 1 nested if', async (assert) => {
    const code = `function iftest() {
      if (true) {
        if (true) {
          console.log('Aprobados')
        }
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(1, vector.simpleIfCount)
    assert.equal(1, vector.doubleIfCount)
    assert.equal(0, vector.multipleIfCount)
  })
  test('Test function with multiple nested if', async (assert) => {
    const code = `function iftest() {
      if (true) {
        if (true) {
          if (true) {
            console.log('Aprobados')
          }
        }
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(1, vector.simpleIfCount)
    assert.equal(1, vector.doubleIfCount)
    assert.equal(1, vector.multipleIfCount)
  })
  test('Test function with multiple nested if', async (assert) => {
    const code = `function iftest() {
      if (true) {
        if (true) {
          console.log('Aprobados')
        }
        if (true) {
          console.log('Aprobados')
        }
      }
    }`

    const vector = (new MetricVectorsDistance()).toVector(code)

    assert.equal(1, vector.simpleIfCount)
    assert.equal(2, vector.doubleIfCount)
    assert.equal(0, vector.multipleIfCount)
  })
})
