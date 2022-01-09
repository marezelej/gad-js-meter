function palindromeChecker(str) {
    const strReversed = str.split("").reverse().join("");
    return strReversed === str ? "es palindromo" : "no es palindromo";
}

function palindrome(str) {
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join(''); 
    return reverseStr === lowRegStr;
  }