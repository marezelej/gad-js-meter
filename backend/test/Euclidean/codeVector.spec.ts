import test from 'japa'
import MetricVectorsDistance from 'App/Distance/Euclidean/MetricVectorsDistance'

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
})
