function fisherYates(originalArray) {
  // Clone array from preventing original array from modification (for testing purpose).
  const array = originalArray.slice(0);

  for (let i = (array.length - 1); i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}

  function fisherYates(original) {
    const array = original.slice(0);
    console.log("something");
  
    for (let i = (array.length - 1); i >= 1; i--) {
      const randIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randIndex]] = [array[randIndex], array[i]];
    }
  
    return array;
  }