// *`Math`, but Better.*
//
// bettermath is a browser- and node- compatible javascript module for a variety
// of useful numerical computations on arrays of numbers.

'use strict';

(function() {

  // If we're in the browser, make sure you've included lodash
  if( typeof window !== 'undefined' && window._ ) {
    var _ = window._
  }

  if( typeof _ === 'undefined' ) {
    if( typeof require !== 'undefined' ) {
      var _ = require('lodash');
    } else {
      throw new Error('bettermath requires lodash');
    }
  }

  //It's designed to work seamlessly as a mixin with the standard `Math` object,
  //However, I know that messing with standard globals makes some people sick to
  //their stomachs, so it doesn't do it automatically.
  //
  //If you're using it in the browser, you can access it from the `math` global.
  //(Note the lower-case 'm').
  //
  //It you're working in [node](http://nodejs.com), you can `require` it into
  //whatever you want.

  var math = {};

  //## Unary Functions (for a single number)

  //### square
  // Multiplies a number by itself.
  math.square = function(val) {
    return Math.pow(val, 2);
  };

  //### cube
  // Multiplies a number by its square.
  math.cube = function(val) {
    return Math.pow(val, 3);
  };

  //### isEven
  // Returns a boolean indicating whether a number n is even.
  math.isEven = function(n) {
    return n % 2 === 0;
  };

  //### isOdd
  // Returns a boolean indicating whether a number n is odd.
  math.isOdd = function(n) {
    return !math.isEven(n);
  };

  //### isPrime
  // Returns a boolean variable indicating whether a number n is prime.
  math.isPrime = function(n) {
    var safeN = Math.abs(Math.round(n));
    if (!n) {
      return false;
    } else if (n!==2) {
      var goUntil = Math.ceil(Math.sqrt(safeN));
      for (var i=2; i<=goUntil; i++) {
        if (safeN%i==0) {
          return false;
        }
      }
    }
    return true;
  }

  //### factors
  // Returns an array of the factors of a number, n
  math.factors = function(n) {
    var result = [];
    var startN = Math.abs(Math.round(n));
    var finished = false;
    while(!finished) {
      finished = true;
      for (var i=2; i<=startN/2; i++) {
        if (n%i==0) {
          n/=i;
          result.push(i);
          finished=false;
          break;
        }
      }
    }
    if (result.length===0){
      result.push(startN);
    }
    return result;
  }

  //### divisors
  // Returns an array of the divisors of a number n
  math.divisors = function(n, opts) {
    var safeN = Math.abs(Math.round(n));
    if (Math.abs(n)===safeN)
    opts = opts || {}
    var result = [1];
    for (var i=2; i<=safeN/2; i++){
      if (safeN%i==0){
        result.push(i)
      }
    }
    if (!opts.proper){
      result.push(safeN);
    }
    return result;
  }

  //### undirected Edges
  // Given an undirected graph of n nodes, what is the upper bound on the number
  // of distinct edges?
  math.undirectedEdges = function(n){
    return n * (n-1) / 2;
  };

  //### format
  // Truncates a number n at the given precision
  math.format = function(n, precision) {
    return (n.toFixed(precision))/1;
  };

  //## Binary functions (for two numbers)

  //### sameSign
  // Compares the signs of two values
  math.samesign = function(x, y) {
    return (x >= 0) !== (y < 0);
  };

  //### copySign
  // Copies the sign of y onto x
  math.copysign = function(x, y) {
    return math.samesign(x, y) ? x : -x;
  };

  //### gcd
  // Determines the greatest common divisor between two numbers, a and b.
  math.gcd = function(a, b) {
    var ref;
    while (b) {
      ref = [b, a % b], a = ref[0], b = ref[1];
    }
    return a;
  };

  //### lcm
  // Determines the least common multiple of two numbers, a and b.
  math.lcm = function(a, b) {
    return a / math.gcd(a, b) * b;
  };

  //## Trinary functions (for three numbers)

  //### between
  // Returns a boolean indicating whether a number x is between two others
  // numbers, a and b.
  math.between = function (x, a, b) {
      return (a<=x && x<=b) || (b<=x && x<=a);
  };

  //## Array (of numbers) Functions
  // Note that these will also generally work with arrays of objects, provided
  // you pass a 'key' argument indicating the key in the object which you wish
  // to operate on.

  //### sum
  // Computes the sum of an array of numbers (or an array of objects with a
  // given `key`).
  //
  //`math.sum([1,2,3]);` &rArr; 6
  //
  //`math.sum([{b: 4},{b: 5},{b: 6}], 'b')` &rArr; 15
  math.sum = math.add = function(obj, key) {
    return math.pluck(obj, key).reduce((a, b)=>{return a + b}, 0);
  };

  //### product
  // Computes the product of an array of numbers (or an array of objects with a
  // a given `key`).
  //
  // `math.product([1,2,3])` &rArr; 6
  //
  // `math.product([{b: 4},{b: 5},{b: 6}], 'b')` &rArr; 120
  math.product = math.multiply = function(obj, key){
    return math.pluck(obj, key).reduce((a, b)=>{return a * b}, 1);
  }

  //### range
  // Given a number, s, range returns an array of integers between 1 and s
  // (inclusive).
  //
  // Given two numbers s and t, range returns an array of integers between t and
  // s (inclusive).
  //
  // Given two numders s and t, along with an interval (as a third number) i,
  // range returns an array of integers between t and s such that the difference
  // between each element in the output array is exactly i.
  math.range = function(stop, start, step) {
    start = start || 1;
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  //### factorial
  // Given a number, computes the factorial.
  //
  // Given an array of numbers, computes the factorial of each.
  math.factorial = function(obj, key){
    if(_.isNumber(obj)){
      if (obj < 0) {
        return Infinity;
      } else if (obj === 0) {
        return 1;
      } else {
        return math.product(math.range(obj));
      }
    }
    var arr = math.pluck(obj, key);
    return arr.map((i)=>{return math.product(math.range(i))});
  };

  //### mean
  // Given an array of numbers, returns
  // the [arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean).
  //
  // `math.mean([1,2,3])` &rArr; 2
  math.mean = math.average = function(obj, key){
    var arr = math.pluck(obj, key);
    return math.sum(arr) / arr.length;
  };

  //### median
  // Given an array of numbers, returns
  // the [median](https://en.wikipedia.org/wiki/Median).
  //
  // `math.median([1,2,3,4])` &rArr; 2.5
  math.median = function(obj, key) {
    var arr = math.pluck(obj, key);
    var middle = (arr.length + 1) /2;
    var sorted = math.sort(arr);
    return (sorted.length % 2) ? sorted[middle - 1] : (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
  };

  //### geometricMean
  // Given an array of numbers, returns
  // the [geomatric mean](https://en.wikipedia.org/wiki/Geometric_mean).
  //
  // `math.geometricMean([3,9,27])` &rArr; 9
  math.geometricMean = function(obj, key){
    var arr = math.pluck(obj, key);
    return Math.pow(math.product(arr),1/arr.length);
  };

  //### pow
  // Given a number and an exponent, returns the number raised to the exponent.
  //
  // Given an array of numbers, along
  // with an exponent, returns an array for which each entry is the
  // corresponding value of the original array raised to that exponent.
  //
  //**WARNING! Overwrites Math.pow when mixed with Math**
  //
  // `math.pow(2,3)` &rArr; 8
  var origPow = Math.pow; //Just in case we want to extend Math
  math.pow = function(x, n) {
    if(_.isNumber(x)){
      return origPow(x, n);
    }
    if(_.isArray(x)){
      return x.map((i)=>{return math.pow(i, n)});
    }
  };

  //### scale
  // Transforms an array to fit within the range [min, max], such that the
  // ratios between any two elements are maintained.
  //
  // `math.scale([0, 2, 5, 10])` &rArr; [0, 0.2, 0.5, 1]
  math.scale = function(arr, min, max) {
    if(typeof min == 'undefined') min = 0;
    if(typeof max == 'undefined') max = 1;
    var minArr = Math.min(...arr);
    var oldRange = Math.max(...arr) - minArr;
    var newRange = max - min;
    return arr.map((i)=>{return (i - minArr) / oldRange * newRange + min});
  };

  //### slope
  // Computes the slope between two ordered pairs.
  //
  // `math.slope([0,0],[1,2])` &rArr; 2
  math.slope = function(a, b) {
    return (a[1] - b[1]) / (a[0] - b[0]);
  };

  //### Sort
  // Sorts an array of numbers.
  //
  // `math.sort([3,1,2])` &rArr; [1,2,3]
  math.sort = _.sortBy;

  //### Variance
  // Computes the variance of an array of numbers.
  //
  // `math.variance([1,2,3])` &rArr; 2/3
  math.variance = function(arr) {
    var mean = math.mean(arr);
    return math.mean(arr.map((x)=>{return math.pow(x-mean, 2)}));
  };

  //### stdDeviation
  // Computes the Standard Deviation of an array of numbers.
  //
  // `math.stdDeviation([1,2,3])` &rArr; 0.816496580927726
  math.stdDeviation = math.sigma = function(obj, key) {
    return Math.sqrt(math.variance(math.pluck(obj, key)));
  };

  //### zscore
  // Computes the standard Z-score, *assuming a normal distribution*
  //
  // `math.zscore([1,2,3])` &rArr; [-1.224744871391589, 0, 1.224744871391589]
  math.zscore = function(obj, key) {
    var arr = math.pluck(obj, key),
        mean = math.mean(arr),
        sigma = math.stdDeviation(arr);
    return arr.map((d)=>{return (d-mean)/sigma});
  };

  //### movingAvg
  // Computes a moving average of an array of numbers.
  //
  // `math.movingAvg([1,2,3,4,5], 3)` &rArr; [2,3,4]
  math.movingAvg = function(arr, size) {
    var win, i, newarr = [];
    for(i = size-1; i <= arr.length; i++) {
      win = arr.slice(i-size, i);
      if (win.length === size) {
        newarr.push(math.mean(win));
      }
    }
    return newarr;
  };

  //## Matrix Operations
  // For the purposes of BetterMath, a Matrix is simply an array containing m
  // arrays each of exactly length n. There are many other implementations of
  // Matrices and Matrix-like objects in Javascript.

  //### Transpose
  // Computes a transpose of the given matrix.
  //`math.transpose(([1,2,3], [4,5,6], [7,8,9]])` &rArr; [[1,4,7], [2,5,8], [3,6,9]]
  math.transpose = function(arr) {
    var trans = [];
    arr.forEach((row, y)=>{
      row.forEach((col, x)=>{
        if (!trans[x]) trans[x] = [];
        trans[x][y] = col;
      });
    });
    return trans;
  };

  //## Helper Functions

  //### Pluck
  // Returns an array of numbers.
  math.pluck = function(obj, key){
    if (_.isArray(obj) && typeof obj[0] === 'number') {
      var arr = obj;
    } else {
      var key = key || 'value';
      var arr = _.map(obj, key);
    }
    return arr;
  };

  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = math
    }
    exports.math = math
  }
  else {
    window.math = math
  }

}).call(this);
