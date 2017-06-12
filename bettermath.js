// *`Math`, but Better.*
//
// bettermath is a browser- and node- compatible javascript module for a variety
// of useful numerical computations on arrays of numbers.

'use strict';

(function(){

  // If you're using it in the browser, you can access it from the `math`
  // global ([sorry](http://wiki.c2.com/?GlobalVariablesAreBad)). (Note the
  // lower-case 'm').

  var math = {};

  // It you're working in [node](http://nodejs.com), you can `require` it into
  // whatever you want.

  // It's designed to work seamlessly as a mixin with the standard
  // [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
  // object. This should be [very safe to do](https://aaboyles.github.io/bettermath/test/mixindex.html),
  // but if you have any problems doing so, please [let me know](https://github.com/AABoyles/bettermath/issues).)
  // To preserve the original implementations of the functions in Math in case
  // you do use it as a mixin, let's clone Math to `math.orig`.
  math.orig = {};
  Object.getOwnPropertyNames(Math).forEach((key) => {
    if(typeof Math[key] == "function"){
      return math.orig[key] = Math[key].bind({});
    } else {
      return math.orig[key] = Math[key];
    }
  });

  //## Helper Functions
  // To start, let's build out some simple functions which will be important
  // building blocks for our later functions.

  //### isArray
  // Determines if a given object is an array.
  math.isArray = function(obj){
    if(Array.isArray) return Array.isArray(obj);
    return obj.constructor === Array;
  };

  //### isObject
  // Determines if a given object is an object.
  math.isObject = function(obj){
    return obj === Object(obj);
  };

  //### Pluck
  // Given a non-array, obj, returns obj.
  //
  // Given an array of numbers, returns the array of numbers.
  //
  // Given an array of objects and a string, 'key', returns an array of whatever
  // was mapped to key in each element of the array.
  math.pluck = function(obj, key){
    var arr = obj;
    if(math.isArray(obj)){
      if(math.isObject(obj[0])){
        key = key || 'value';
        return arr.map(i => i[key]);
      }
      return arr.slice();
    }
    return arr;
  };

  //#### range
  // Given a number, s, range returns an array of integers between 1 and s
  // (inclusive).
  //
  // Given two numbers s and t, range returns an array of integers between t and
  // s (inclusive).
  //
  // Given three numders s, t, and i, range returns an array of integers between
  // t and s + i - 1 (inclusive) such that the difference between each element
  // in the output array is exactly i.
  math.range = function(stop, start, step){
    start = start || 1;
    step = step || 1;
    var length = math.max(math.ceil((stop - start) / step), 0);
    var range = Array(length);
    for (var idx = 0; idx < length; idx++, start += step){
      range[idx] = start;
    }
    return range;
  };

  //#### repeat
  // Given an array, `obj`, and a number, `times`, returns an array which
  // repeats `obj` `times` times.
  //
  // `math.repeat([1,2,3], 2)` &rArr; [1,2,3,1,2,3]
  math.repeat = function(obj, times){
    if(!math.isArray(obj)){ obj = [obj]; }
    if(!times){ return obj; }
    var out = [];
    for(var i = 0; i < times; i++){
      out = out.concat(obj);
    }
    return out;
  };

  //#### repeatEach
  // Given an array, `arr`, and a number, `each`, returns an array which
  // repeats each value of `arr` `each` times.
  //
  // `math.repeatEach([1,2,3], 2)` &rArr; [1,1,2,2,3,3]
  math.repeatEach = function(obj, each){
    if(!math.isArray(obj)){ obj = [obj]; }
    each = each || 1;
    var out = Array(each * obj.length);
    obj.forEach(function(el, i){
      for(var j = 0; j < each; j++){
        out[i * each + j] = el;
      }
    });
    return out;
  };

  //## Randomizers
  // Randomizers provide sources of pseudo-randomly values. These are largely
  // based on Math.random, which is not crpytographically secure. Accordingly,
  // These should not be used for applications which secure random values.

  //### random
  // Returns a random value between 0 and 1.
  //
  // Given a number n, returns an array of n random values.
  math.random = function(n){
    if(!n) return math.orig.random();
    var out = Array(n);
    for(var i = 0; i < n; i++){
      out[i] = math.random();
    }
    return out;
  };

  //### randomBoolean
  // Returns a random boolean value.
  //
  // Given a number n, returns an array of n random booleans.
  math.randomBoolean = function(n){
    if(!n) return math.orig.random() > 0.5 ? 1 : -1;
    var out = Array(n);
    for(var i = 0; i < n; i++){
      out[i] = math.randomBoolean();
    }
    return out;
  };

  //### randomDirection
  // AKA `randomSign`
  //
  // Returns one of [-1, 1]
  //
  // Given a number n, returns an array of n random directions.
  math.randomDirection = math.randomSign = function(n){
    if(!n) return math.orig.random() > 0.5 ? 1 : -1;
    var out = Array(n);
    for(var i = 0; i < n; i++){
      out[i] = math.randomDirection();
    }
    return out;
  };

  //### randomElement
  // AKA `randomItem`
  //
  // Given an array, return one element selected at random.
  math.randomElement = math.randomItem = function(arr){
    return arr[math.floor(math.random()*arr.length)];
  };

  //## Mappers
  // Mapper functions accept a single argument (which may be an array of numbers
  // or objects), and return an object of roughly similar type and size.
  // For example, passing a number to a mapper should result in a number.
  // Passing an array of `n` numbers should (in most cases) return an array of
  // `n` numbers.
  //
  // Note that these will also generally work with arrays of objects, provided
  // you pass a 'key' argument indicating the key in the object which you wish
  // to operate on.

  //### Identifiers
  // This is a special class of mappers which return boolean variables,
  // identifying if a given number meets a defined criterion. They are
  // distinguished by the naming scheme is[Type] where [Type] is some
  // term that's meaningful to either Mathematics or Javascript.

  //### isUndefined
  // Determines if a given object is undefined.
  math.isUndefined = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isUndefined);
    }
    return typeof obj === 'undefined';
  };

  //### isNumber
  // Determines if a given object is a number
  math.isNumber = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNumber);
    }
    return typeof obj === 'number';
  };

  //### isNaN
  // Determines if a given object is [Not a Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
  math.isNaN = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNaN);
    }
    return math.isNumber(obj) && obj !== +obj;
  };

  //### isInteger
  // Determines if a given object is an integer
  math.isInteger = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isInteger);
    }
    return Number.isInteger(obj);
  };

  //### isPositive
  // Determines whether a number is positive
  math.isPositive = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isPositive);
    }
    return obj > 0;
  };

  //### isNegative
  // Determines whether a number is negative
  math.isNegative = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNegative);
    }
    return obj < 0;
  };

  //### isNonnegative
  // Determines whether a number is nonnegative
  math.isNonnegative = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNonnegative);
    }
    return obj >= 0;
  };

  //### isNonpositive
  // Determines whether a number is nonpositive
  math.isNonpositive = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNonpositive);
    }
    return obj <= 0;
  };

  //### isZero
  // Determines whether a number is Zero
  math.isZero = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isZero);
    }
    return obj === 0;
  };

  //### isNonzero
  // Determines whether a number is nonzero
  math.isNonzero = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNonzero);
    }
    return obj !== 0;
  };

  //### isSameSign
  // Compares the signs of two values
  math.isSameSign = function(obj, b){
    if(math.isArray(obj)){
      return obj.map(i => math.sameSign(i, b));
    }
    return (obj >= 0) !== (b < 0);
  };

  //### isFinite
  // Determines whether a number is finite
  math.isFinite = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isFinite);
    }
    return Number.isFinite(obj);
  };

  //### isInfinite
  // Determines whether a number is positive
  math.isInfinite = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isInfinite);
    }
    return !math.isFinite(obj);
  };

  //### isEven
  // Determines whether a number is even.
  math.isEven = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isEven);
    }
    return obj % 2 === 0;
  };

  //### isOdd
  // Determines whether a number is odd.
  math.isOdd = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isOdd);
    }
    return obj % 2 === 1;
  };

  //### isPrime
  // Determines whether a number is prime.
  //
  // *Note* that for a numeric input, n, this is O(sqrt(n)). For arrays of size
  // m, it's O(m*sqrt(n)). It isn't the most efficient possible implementation,
  // but it's reasonably simple.
  math.isPrime = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isPrime);
    }
    if (!obj){
      return false;
    } else if (obj !== 2){
      var safeN = math.abs(math.round(obj));
      var goUntil = math.ceil(math.sqrt(safeN));
      for (var i = 2; i <= goUntil; i++){
        if (safeN % i === 0){
          return false;
        }
      }
    }
    return true;
  };

  //### isComposite
  // Determines whether a number is composite.
  math.isComposite = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isComposite);
    }
    return !math.isPrime(obj);
  };

  //### isPerfect
  // Determines whether a number is perfect.
  //
  // Because there are so few which can be represented as integers, it's vastly
  // more efficient to just store them all than attempt to compute and sum
  // factors or check for Eulerian forms.
  math.isPerfect = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isComposite);
    }
    var perfects = [6, 28, 496, 8128, 33550336, 8589869056, 137438691328];
    return obj in perfects;
  };

  //### sign
  // Returns one of [-1,0,1], indicating whether the given obj is negative,
  // zero, or positive
  math.sign = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.sign);
    }
    return math.orig.sign(obj);
  };

  //### floor
  // Returns the greatest integer less than a given value.
  math.floor = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.floor);
    }
    return math.orig.floor(obj);
  };

  //### ceil
  // Returns the least integer greater than a given value.
  math.ceil = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.ceil);
    }
    return math.orig.ceil(obj);
  };

  //### round
  // Returns the nearest integer to a given value.
  math.round = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.round);
    }
    return math.orig.round(obj);
  };

  //### clamp
  // Returns the nearest value to a number within the range [lower, upper].
  math.clamp = function(arr, lower, upper){
    if(math.isArray(arr)){
      return arr.map(i => math.clamp(i, lower, upper));
    }
    if(arr < lower){ return lower; }
    if(arr > upper){ return upper; }
    return arr;
  };

  //### trunc
  // Returns an integer with all digits less than one truncated.
  math.trunc = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.trunc);
    }
    return math.orig.trunc(obj);
  };

  //### abs
  // Returns the absolute value of a number.
  math.abs = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.abs);
    }
    return math.orig.abs(obj);
  };

  //### add
  // Adds a value to each element of an array.
  math.add = function(arr, summand){
    if(math.isArray(arr)){
      return arr.map(i => math.add(i, summand));
    }
    return arr + summand;
  };

  //### subtract
  // Subtracts a value from each element of an array.
  math.subtract = function(arr, subtrahend){
    if(math.isArray(arr)){
      return arr.map(minuend => math.subtract(minuend, subtrahend));
    }
    return arr - subtrahend;
  };

  //### multiply
  // AKA `scale`
  //
  // Multiplies by a scalar.
  math.multiply = math.scale = function(arr, scalar){
    if(math.isArray(arr)){
      return arr.map(i => math.scale(i, scalar))
    }
    return arr * scalar;
  };

  //### scale01
  // Transforms an array to fit within the range [0, 1], such that the
  // ratios between any two pairs of elements are maintained.
  //
  // `math.scale01([0, 2, 5, 10])` &rArr; [0, 0.2, 0.5, 1]
  math.scale01 = function(obj, key){
    var arr = math.pluck(obj, key);
    return math.scalemm(arr, 0, 1);
  };

  //### scale11
  // Transforms an array to fit within the range [-1, 1], such that the
  // ratios between any two pairs of elements are maintained.
  //
  // `math.scale11([0, 2, 5, 10])` &rArr; [-1, -0.6, 0, 1]
  math.scale11 = function(obj, key){
    var arr = math.pluck(obj, key);
    return math.scalemm(arr, -1, 1);
  };

  //### scale0100
  // Transforms an array to fit within the range [0, 100], such that the
  // ratios between any two pairs of elements are maintained.
  //
  // `math.scale11([0, 2, 5, 10])` &rArr; [-1, -0.6, 0, 1]
  math.scale0100 = function(obj, key){
    var arr = math.pluck(obj, key);
    return math.scalemm(arr, 0, 100);
  };

  //### scalemm
  // Transforms an array to fit within the range [min, max], such that the
  // ratios between any two elements are maintained.
  //
  // `math.scalemm([0, 2, 5, 10])` &rArr; [-1, -0.6, 0, 1]
  math.scalemm = math.scaleMM = function(arr, min, max){
    if(math.isUndefined(min)) min = 0;
    if(math.isUndefined(max)) max = 1;
    var minArr = math.min(arr);
    var oldRange = math.max(arr) - minArr;
    var newRange = max - min;
    return arr.map(i => (i - minArr) / oldRange * newRange + min);
  };

  //### divide
  // Divides each element in arr by divisor.
  math.divide = function(arr, divisor){
    if(math.isArray(arr)){
      return arr.map(dividend => math.divide(dividend, divisor))
    }
    return arr / divisor;
  };

  //### modulo
  // Divides each element in arr by divisor, and returns the remainder.
  math.modulo = function(arr, divisor){
    if(math.isArray(arr)){
      return arr.map(dividend => math.modulo(dividend, divisor))
    }
    return arr % divisor;
  };

  //### pow
  // Given a number and an exponent, returns the number raised to the exponent.
  //
  // Given an array of numbers, along with an exponent, returns an array for
  // which each entry is the corresponding value of the original array raised
  // to that exponent.
  //
  // Given an array of objects, should fail. If you need to raise an array of
  // objects to an exponent, please use `math.square`, `math.cube`, `math.sqrt`,
  // and `math.cbrt` for n = 2, 3, 1/2, and 1/3 respectively. For arbitrary
  // values of n, please call `math.pluck` your array first, and pass the
  // plucked array to `math.pow`.
  //
  // `math.pow(2,3)` &rArr; 8
  //
  // `math.pow([1, 2, 10], 3)` &rArr; [1, 8, 1000]
  math.pow = function(obj, n){
    if(math.isArray(obj)){
      return obj.map(i => math.pow(i, n));
    }
    return math.orig.pow(obj, n);
  };

  // Note that the following functions will accept arrays of objects, where
  // math.pow will not.

  //### square
  // Multiplies a number by itself.
  math.square = function(obj, key){
    return math.pow(math.pluck(obj, key), 2);
  };

  //### cube
  // Multiplies a number by its square.
  math.cube = function(obj, key){
    return math.pow(math.pluck(obj, key), 3);
  };

  //### sqrt
  // Given a number, computes the Square Root
  math.sqrt = function(obj, key){
    return math.pow(math.pluck(obj, key), 1/2);
  };

  //### cbrt
  // Given a number, computes the Cube Root
  math.cbrt = function(obj, key){
    return math.pow(math.pluck(obj, key), 1/3);
  };

  //### exp
  // Given a number x, computes e^x where e is Euler's natural base.
  math.exp = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.exp);
    }
    return math.pow(math.orig.E, obj);
  };

  //### expm1
  // Given a number x, computes e^x-1 where e is Euler's natural base.
  math.expm1 = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.expm1);
    }
    return math.pow(math.orig.E, obj) - 1;
  };

  //### log
  // Computes the natural logarithm of a number.
  math.log = math.ln = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.log);
    }
    return math.orig.log(obj);
  };

  //### log1p
  // Given a number x, computes the natural logarithm of x + 1
  math.log1p = math.ln1p = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.log1p);
    }
    return math.log(1 + obj);
  };

  //### log10
  // Computes the logarithm base 10 of a number.
  math.log10 = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.log10);
    }
    return math.orig.log10(obj);
  };

  //### log2
  // Computes the logarithm base 2 of a number.
  math.log2 = math.lg = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.log2);
    }
    return math.orig.log2(obj);
  };

  //### logb
  // Computes the logarithm base b of an object (or each element within it)
  math.logb = function(obj, base){
    var b = math.log(base);
    if(math.isArray(obj)){
      //I know, this breaks the design pattern, but it saves `n` operations.
      return obj.map(x => math.log(x)/b);
    }
    return math.log(obj)/b;
  };

  //### factorial
  // Given a number, computes the factorial.
  math.factorial = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.factorial);
    }
    if (obj < 0){
      return Infinity;
    } else if (obj === 0){
      return 1;
    } else {
      return math.product(math.range(obj));
    }
  };

  //### copySign
  // Copies the sign of y onto x
  math.copySign = function(obj, b){
    if(math.isArray(obj)){
      return obj.map(i => math.copysign(i, b));
    }
    return math.samesign(obj, b) ? obj : -obj;
  };

  //### undirectedEdges
  // Computes the maximum number of distinct edges of an undirected graph of `n`
  // nodes.
  math.undirectedEdges = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.undirectedEdges);
    }
    return obj * (obj - 1) / 2;
  };

  //### factors
  // Returns an array of the factors of a number, n
  math.factors = function(obj){
    if(math.isArray(obj)){
      obj.map(math.factors);
    }
    var result = [],
        startN = math.abs(math.round(obj)),
        finished = false;
    while(!finished){
      finished = true;
      for (var i = 2; i <= startN / 2; i++){
        if (obj % i === 0){
          obj /= i;
          result.push(i);
          finished = false;
          break;
        }
      }
    }
    if (result.length === 0){
      result.push(startN);
    }
    return result;
  };

  //### divisors
  // Returns an array of the divisors of a number n
  math.divisors = function(obj){
    if(math.isArray(obj)){
      return obj.map(math.divisors);
    }
    var safeN = math.abs(math.round(obj));
    var result = [1];
    for(var i = 2; i <= safeN / 2; i++){
      if(safeN % i === 0){
        result.push(i);
      }
    }
    return result;
  };

  //### between
  // Returns a boolean indicating whether a number x is between two others
  // numbers, a and b.
  math.between = function (obj, a, b){
    if(math.isArray(obj)){
      return obj.map(i => math.between(i, a, b));
    }
    return (a<=obj && obj<=b) || (b<=obj && obj<=a);
  };

  //### format
  // Truncates a number n at the given precision
  //
  // `var t = math.pluck([{a:1.234}, {a:2.345}], 'a'); math.format(t, 2);` &rArr;
  math.format = function(obj, precision){
    if(math.isArray(obj)){
      return obj.map(i => math.format(i, precision));
    }
    return (obj.toFixed(precision))/1;
  };

  //### sort
  // Given an array of numbers, returns the array sorted.
  //
  // *Warning:* This implements an in-place algorithm.
  //
  // `math.sort([3,1,2])` &rArr; [1,2,3]
  math.sort = function(obj, descending){
    if(descending){
      return obj.sort((a, b) => b - a);
    } else {
      return obj.sort((a, b) => a - b);
    }
  };

  //### shuffle
  // Returns a shuffled array.
  //
  // *Warning:* This implements [Fisher-Yates Shuffling](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle),
  // which is an an in-place algorithm.
  math.shuffle = function(obj, key){
    var arr = math.pluck(obj, key);
    var m = arr.length, t, i;
    while (m){
      i = math.floor(math.random() * m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }
    return arr;
  };

  //### Trigonometry
  // Performs trigonometric computations.
  ['sin', 'sinh', 'cos', 'cosh', 'tan', 'tanh', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh'].forEach(fun => {
    math[fun] = function(obj, key){
      if(math.isArray(obj)){
        var arr = math.pluck(obj, key);
        return arr.map(i => math[fun](i));
      }
      return math.orig[fun](obj);
    };
  });

  math.atan2 = function(arr, b){
    return math.atan(math.divide(arr, b));
  };

  //### zScore
  // Computes the standard Z-score, *assuming a normal distribution.*
  //
  // `math.zScore([1,2,3])` &rArr; [-1.224744871391589, 0, 1.224744871391589]
  math.zScore = math.zscore = function(obj, key){
    var arr = math.pluck(obj, key),
        mean = math.mean(arr),
        sigma = math.stdDeviation(arr);
    return arr.map(d => (d-mean)/sigma);
  };

  //## Reducers
  //
  // Reducers are functions which accept an array and return (usually) a singe
  // number. (Some, like `math.movingAvg` will return a smaller array).
  // Perhaps the most recognizable reducer is the Arithmetic mean (more
  // commonly just called the "average"), though there are many other well-
  // known, simple reducers (as you can see from the list of functions between
  // this paragraph and `math.mean`).

  //### min
  // Computes the maximum of an array of numbers
  //
  //`math.maxArr([1,2,3]);` &rArr; 3
  math.min = function(obj, key, ...others){
    if(!math.isArray(obj)){
      return math.orig.min(obj, key, ...others);
    }
    return math.orig.min(...math.pluck(obj, key));
  };

  //### max
  // Computes the maximum of an array of numbers
  //
  //`math.maxArr([1,2,3]);` &rArr; 3
  math.max = function(obj, key, ...others){
    if(!math.isArray(obj)){
      return math.orig.max(obj, key, ...others);
    }
    return math.orig.max(...math.pluck(obj, key));
  };

  //### sum
  // Computes the sum of an array of numbers (or an array of objects with a
  // given `key`).
  //
  //`math.sum([1,2,3]);` &rArr; 6
  //
  //`math.sum([{b: 4},{b: 5},{b: 6}], 'b')` &rArr; 15
  math.sum = function(obj, key){
    return math.pluck(obj, key).reduce((a, b) => a + b, 0);
  };

  //### product
  // Computes the product of an array of numbers (or an array of objects with a
  // a given `key`).
  //
  // `math.product([1,2,3])` &rArr; 6
  //
  // `math.product([{b: 4},{b: 5},{b: 6}], 'b')` &rArr; 120
  math.product = function(obj, key){
    return math.pluck(obj, key).reduce((a, b) => a * b, 1);
  };

  // If you're curions, there's no implementation of difference or quotient
  // because subraction and division are non-commutative, which makes them
  // (modestly) difficult to reason about in a sufficiently general way.
  // Accordingly, it seems better that someone who needs such a function
  // actually implement the logic themselves.

  //### gcd
  // Determines the greatest common divisor between two numbers.
  math.gcd = function(obj, b){
    if(math.isArray(obj)){
      return obj.map(i => math.gcd(i, b));
    }
    var ref;
    while(b){
      ref = [b, obj % b];
      obj = ref[0];
      b = ref[1];
    }
    return obj;
  };

  //### lcm
  // Determines the least common multiple of two numbers.
  math.lcm = function(obj, b){
    if(math.isArray(obj)){
      return obj.map(i => math.lcm(i, b));
    }
    return obj / math.gcd(obj, b) * b;
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
  math.median = function(obj, key){
    var arr = math.pluck(obj, key);
    var middle = (arr.length + 1) /2;
    var sorted = math.sort(arr.slice());
    return (sorted.length % 2) ? sorted[middle - 1] : (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
  };

  //### modes
  // Returns an array of the most frequently recurring value in the input array.
  math.mode = math.modes = function(obj, key){
    var arr = math.pluck(obj, key);

    if (!arr.length) return [];

    var modeMap = {},
        maxCount = 0,
        modes = [];

    arr.forEach(val => {
      if (!modeMap[val]){
        modeMap[val] = 1;
      } else {
        modeMap[val]++;
      }
      if (modeMap[val] > maxCount){
        modes = [val];
        maxCount = modeMap[val];
      } else if (modeMap[val] === maxCount){
        modes.push(val);
      }
    });
    return modes;
  };

  //### geometricMean
  // Given an array of numbers, returns
  // the [geometric mean](https://en.wikipedia.org/wiki/Geometric_mean).
  //
  // `math.geometricMean([3,9,27])` &rArr; 9
  math.geometricMean = function(obj, key){
    var arr = math.pluck(obj, key);
    return math.pow(math.product(arr),1/arr.length);
  };

  //### midrange
  // Given an array of numbers, returns the [midrange]() (the mean of the max
  // and min of a set of numbers).
  //
  // `math.midrange([3,9,27])` &rArr; 18
  math.midrange = math.midRange = function(obj, key){
    var arr = math.pluck(obj, key);
    var min = math.min(arr);
    return ((math.max(arr) - min) / 2) + min;
  };

  //### Variance
  // Computes the variance of an array of numbers.
  //
  // `math.variance([1,2,3])` &rArr; 2/3
  math.variance = function(obj, key){
    var arr = math.pluck(obj, key);
    var mean = math.mean(arr);
    return math.mean(arr.map(x => math.pow(x - mean, 2)));
  };

  //### stdDeviation
  // Computes the Standard Deviation of an array of numbers.
  //
  // `math.stdDeviation([1,2,3])` &rArr; 0.8165...
  math.stdDeviation = math.sigma = function(obj, key){
    return math.sqrt(math.variance(math.pluck(obj, key)));
  };

  //### meanAbsoluteDeviation
  // Computes the mean absolute deviation of an array of numbers.
  //
  // `math.meanAbsoluteDeviation([1,2,3])` &rArr; 1
  math.meanAbsoluteDeviation = function(obj, key){
    var arr  = math.pluck(obj, key),
        mean = math.mean(arr);
    return math.mean(arr.map(n => math.abs(n - mean)));
  };

  //### hypot
  // AKA `rss` for "Root sum of squares"
  //
  // Given any number of numbers (in an array or given as arbitrary arguments).
  // returns the root sum of squares. For n numbers, this is equivalent to a
  // hypotenuse in n-dimensional space.
  math.hypot = math.rss = function(obj, key, ...others){
    if(math.isArray(obj)){
      var arr = math.pluck(obj, key);
      if(math.isNumber(key)){
        return math.hypot(...arr, key, ...others);
      }
      return math.hypot(...arr, ...others);
    }
    return math.orig.hypot(obj, key, ...others);
  };

  //### wilson
  // Given an array of boolean values and a Z-score, returns the
  // [Wilson Score Interval](http://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval)
  //
  // Z-score is defaulted to cover the 95% interval.
  math.wilson = function(obj, z){
    var up    = obj.reduce((x, i) => i ? x + 1 : x, 0),
        total = obj.length;
    if(total <= 0 || total < up) return 0;
    var avg = up/total,
        z   = z || 1.644853,
        z2  = math.square(z);
    return (avg + z2/(2*total) - z*math.sqrt((avg*(1 - avg) + z2/(4*total))/total))/(1 + z2/total);
  };

  //### movingAvg
  // Computes a moving average of an array of numbers.
  //
  // In case this is non-obvious, this should return an array of fewer elements
  // than the original array contained.
  //
  // `math.movingAvg([1,2,3,4,5], 3)` &rArr; [2,3,4]
  math.movingAvg = function(arr, size){
    var win, i, newarr = [];
    for(i = size - 1; i <= arr.length; i++){
      win = arr.slice(i - size, i);
      if (win.length === size){
        newarr.push(math.mean(win));
      }
    }
    return newarr;
  };

  //That's all, folks!

  if(typeof exports !== 'undefined'){
    if(typeof module !== 'undefined' && module.exports){
      exports = module.exports = math;
    }
    exports.math = math;
  } else {
    window.math = math;
  }

}).call();
