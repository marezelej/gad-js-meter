function cartesianProduct(setA, setB) {
    if (!setA || !setB || !setA.length || !setB.length) {
        return null;
    }

    const product = [];

    for (let indexA = 0; indexA < setA.length; indexA += 1) {
        for (let indexB = 0; indexB < setB.length; indexB += 1) {
        product.push([setA[indexA], setB[indexB]]);
        }
    }
  
    return product;
  }

function cartesianProduct(set1, set2) {
    if (!set1 || !set2 || set1.length == 0 || set2.length == 0) {
      console.log("Invalid sets.");
      return null;
    }
  
    const cartesianProduct = [];
    let i = 0;
    for (let index1 = 0; index1 < set1.length; index1 += 1) {
      for (let index2 = 0; index2 < set2.length; index2 += 1) {
        cartesianProduct.push([set1[index1], set2[index2]]);
        console.log(cartesianProduct[i]);
        i++;
      }
    }
  
    return cartesianProduct;
    }