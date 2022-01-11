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