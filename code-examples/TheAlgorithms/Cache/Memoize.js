function memoize(func) {
  // Initialization of a slot to store the function result
  const cache = {}

  return (...args) => {
    // Retrieving the first argument of the function
    const [arg] = args

    /**
     * Checks if the argument is already present in the cache,
     * then return the associated value / result
     */
    if (arg in cache) {
      return cache[arg]
    }

    /**
     * If the argument is not yet present in the cache,
     * execute original function and save its value / result in cache,
     * finally return it
     */
    const result = func(arg)
    cache[arg] = result
    return result
  }
}
