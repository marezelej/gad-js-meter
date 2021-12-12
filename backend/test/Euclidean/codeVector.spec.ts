import test from 'japa'
import EuclideanDistance from 'App/Distance/Euclidean/EuclideanDistance'

test.group('Code Vector parce', () => {
  test('Test function without loops and variables', async (assert) => {
    const code = `function sum(a, b) {return a + b}`

    const vector = (new EuclideanDistance()).toVector(code)

    assert.equal(vector.loopCount, 0)
    assert.equal(vector.variableCount, 0)
    assert.equal(vector.paramsCount, 2)
    assert.equal(vector.recursiveCallCount, 0)
    assert.equal(vector.maxTreeDeep, 6)
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

    const vector = (new EuclideanDistance()).toVector(code)

    assert.equal(vector.loopCount, 3)
    assert.equal(vector.variableCount, 4)
    assert.equal(vector.paramsCount, 1)
    assert.equal(vector.recursiveCallCount, 0)
    assert.equal(vector.maxTreeDeep, 9)
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

    const vector = (new EuclideanDistance()).toVector(code)

    assert.equal(vector.loopCount, 1)
    assert.equal(vector.variableCount, 0)
    assert.equal(vector.paramsCount, 1)
    assert.equal(vector.recursiveCallCount, 1)
    assert.equal(vector.maxTreeDeep, 11)
  })
})
