function tail(array) {
    const length = array == null ? 0 : array.length
    if (!length) {
      return []
    }
    const [, ...result] = array
    return result
  }
  
  function tail2(vector) {
    return vector?.slice((vector.length-1)*-1)
  }
  
    