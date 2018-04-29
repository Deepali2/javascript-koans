var _; // globals

describe("About Applying What We Have Learnt", function () {
  var products;

  beforeEach(function () {
    products = [
      { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
      { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
      { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
      { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
      { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i, j, hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i += 1) {
      if (products[i].containsNuts === false) {
        hasMushrooms = false;
        for (j = 0; j < products[i].ingredients.length; j += 1) {
          if (products[i].ingredients[j] === "mushrooms") {
            hasMushrooms = true;
          }
        }
        if (!hasMushrooms) productsICanEat.push(products[i]);
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  // function doesNotHaveMushrooms(array) {
  //   return array.filter(element => element === "mushrooms");
  // }

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
    var productsICanEat = [];

    //productsICanEat = products.filter(product => product.containsNuts === false && doesNotHaveMushrooms(product.ingredients).length === 0);
    productsICanEat = products.filter(product => product.containsNuts === false && !_(product.ingredients).any(mushrooms));
    function mushrooms(str) {
      return str === "mushrooms";
    }
    /* solve using filter() & all() / any() */

    expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for (var i = 1; i < 1000; i += 1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1, 1000).reduce((total, num) => {
      if (num % 3 === 0 || num % 5 === 0) {
        total = total + num;
      }
      return total;
    }, 0);   /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
  it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i += 1) {
      for (j = 0; j < products[i].ingredients.length; j += 1) {
        ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain()
      .map(product => product.ingredients)
      .flatten()
      .reduce((tally, ingredient) => { tally[ingredient] = (tally[ingredient] || 0) + 1; return tally }, {})
      .value();

    //.reduce((sum, x) => {return sum + x})

    //.map(products, function(product, index, products) {return product.ingredients})


    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    //loop(i) from 1 to the number(n) and keep checking if the number is divisible by i
    //if n is divisible by i then add both i and n/i to a factors array
    //stop when i is already in the factors array
    //sort the array increasing number
    // now check the factors array elements for prime factors:
    //for each element, divide it number starting with 2 and ending with a nuber less than the element. 
    //if no factor found, then push the element to a primeFactors
    //return the last element of the primeFactors
    var n = 65;
    var findLargestPrimeFactor = n => {
      for (var i = 2; i <= n / i; i++) {
        while (n % i === 0) {
          n = n / i;
          if (n === 1) return i;
        }
      }
      return n;
    }
    expect(findLargestPrimeFactor(n)).toBe(13);

  });


  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //largest palindrome made from the product of two 3 digit numbers
    /*
    smallest non zero 3 digit number is 100
    largest 3 digit number is 999
    initialize variable palindrome = num 1 * num2
    start with both num1 and num2 as 999
    decrease each number one at a time
    keep checking if the product is a palindrome
    */
    var largestPalindromeOfProductOfTwo3DigitNumbers = (num1, num2) => {
      var product = num1 * num2;
      while (!isPalindrome(product)) {
        num2--;
        product = num1 * num2;
        if (isPalindrome(product)) {
          return product;
        }
        num1--;
        product = num1 * num2;
      }
      return product;
    }

    function isPalindrome(number) {
      return number === reversed(number);

    }

    function reversed(number) {
      return Number(String(number).split('').reverse().join(''));
    }
    expect(largestPalindromeOfProductOfTwo3DigitNumbers(100, 999)).toBe(86768);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var smallestNumberDivisibleByEachOfTheNumbersTillN = tillN => {
      var result = tillN;
      while (true) {
        if (isDivisible1ToN(result, tillN)) {
          return result;
        }
        result += tillN;
      }
    }
    function isDivisible1ToN(number, tillN) {
      for (var i = 2; i <= tillN; i++) {
        if (number % i !== 0) {
          return false;
        }
      }
      return true;
    }

    expect(smallestNumberDivisibleByEachOfTheNumbersTillN(20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var differenceBetweenSumOfSquaresAndSquareOfSums = arr => {
      return squareOfSums(arr) - sumOfSquares(arr);
    }

    function squareOfSums(arr) {
      var sum = arr.reduce((total, num) => {
        return total + num;
      });
      return sum * sum;
    }

    function sumOfSquares(arr) {
      return arr.reduce((sum, element) => {
        return sum + (element * element);
      }, 0);
    }
    expect(differenceBetweenSumOfSquaresAndSquareOfSums([2, 3, 4, 5])).toBe(142);
  });

  it("should find the 10001st prime", function () {
    var nthPrimeNum = n => {
      var count = 0;
      var i = 2;
      while (true) {
        if (isPrime(i)) {
          count++;
          if (count === n) {
            return i;
          }
        }
        i++;
      }
    }

    function isPrime(num) {
      if (num === 1) {
        return false;
      }
      for (var i = 2; i < num; i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    }
    expect(nthPrimeNum(10001)).toBe(104743);
  });
});
