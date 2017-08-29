# bettermath

*`Math`, but better.*

Copyright 2017 by Tony Boyles

bettermath is a javascript module for a variety of useful numerical computations on arrays of numbers.

It's designed to work seamlessly as a [mixin](https://en.wikipedia.org/wiki/Mixin) with the standard `Math` object, However, extending standard globals is usually a bad idea, so it doesn't do it automatically.

## INSTALLATION

It's intended to be browser- and node- compatible, so...

### Browser

[Download bettermath](https://raw.githubusercontent.com/AABoyles/BetterMath/master/BetterMath.js) and include it in your html file:

```html
<script src="bettermath.js"></script>
```

You can now access it from the `math` global (sorry). (Note the lower-case 'm').

### Node,js

It's [live on npm](https://www.npmjs.com/package/bettermath), so, from your project directory...

```sh
npm install bettermath --save
```

From here, you can `require` it wherever you want.

```javascript
const math = require('bettermath');
```

## USE

If you want to mix it in with `Math`,

```javascript
Object.assign(Math, math);
```

Otherwise, you can just access everything through `math`.

```javascript
math.median([1,2,3,4])
> 2.5
```

## DOCUMENTATION

[We got some.](http://aaboyles.github.io/bettermath/docs)

## TESTS

[We got some of those too.](http://aaboyles.github.io/bettermath/tests/unit) Coverage isn't awesome, but it's a work in progress.

Oh, in addition to unit testing, [benchmark testing](http://aaboyles.github.io/bettermath/tests/benchmark) is also on the to-do list.

## INSPIRATION

This project is strongly influenced by the R Programming language. In R, the fundamental data structure is a Vector. While there isn't a perfect analog in core Javascript, arrays of numbers can serve for many similar purposes. But Javascript arrays don't have a ton of useful mathematical methods. For example, to multiply the elements of a vector by a scalar in R, you'd just multiply the vector by the scalar, like this:

```R
myVector <- c(1,2,3,4,5)
scalar <- 10
myVector * scalar
> c(10,20,30,40,50)
```

In contrast, Javascript requires us to employ some sort of loop:

```javascript
var myArray = [1,2,3,4,5];
var scalar = 10;
var output = [];
for(var i = 0; i < myArray.length; i++){
  output.push(i * scalar);
}
output
> [10,20,30,40,50]
```

In the interest of avoiding duplication of efforts, we can at least define a function to do the work for us.

```javascript
function scale(vector, scalar){
  output = [];
  for(var i = 0; i < myArray.length; i++){
    output.push(i * scalar);
  }
  return output;
}
```

Now, instead of thinking through the loop structure, we've abstracted it away to a reusable function. We can now invoke it like so:

```javascript
var myArray = [1,2,3,4,5];
var scalar = 10;
scale(myArray, scalar);
> [10,20,30,40,50]
```

Now, let's do that with dozens of functions. That's why this project exists.

*Side Note*: We could, hypothetically, extend the prototype of the array in Javascript to contain a variety of methods like this. In fact, this is the approach taken by MooTools' [Array.Extras](https://mootools.net/more/docs/1.6.0/Types/Array.Extras), one of the ancestors of this project. However, the safety of doing this is too strong an assumption for many environments (the same reasoning underlies bettermath's architectural decision not to override the `Math` object by default).

This project started as a fork of [underscore.math](https://github.com/syntagmatic/underscore.math), but it's gotten pretty far removed for a simple fork. Some other sources of inspiration for this include:

* [js-math](https://github.com/kaleb/js-math)
* [arr-stat.js](https://gist.github.com/Daniel-Hug/7273430)
* [math](https://github.com/danehansen/math)
* [underscorejs](https://underscorejs.com)
* [Mootools' Array.Math](http://mootools.net/forge/p/array_math)
* [Simple Statistics](https://github.com/simple-statistics/simple-statistics)

Thanks to all the developers of these!

## INTENT

The current goal of this project is to re-implement the majority of the methods available in the Math global to operate normally on [Numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), and also perform logically on arrays of numbers or arrays of objects with a given `key`.

Additionally, I aspire to write a wider variety of functions which perform tasks which are similar or related to functions already available in the Math global. For example, we have a lengthy collection of identifier functions (`isEven`, `isPositive`, etc.).

## CONTRIBUTING

If you'd like to contribute, please [fork this repo](https://github.com/AABoyles/bettermath), write an improvement, and submit a pull request.

If you'd like to contribute a new method, please adhere to the following design patterns.

### Mappers

These are the functions which are most urgently needed at this time. Pick a
function and implement it, like so:

```javascript
//### myNewFunction
// Describe what myNewFunction does here.
//
// Put an example here.
math.myNewFunction = function(obj, key){
  if(math.isArray(obj)){
    return math.pluck(obj, key).map(math.myNewFunction);
  }
  var output = 0;
  // Put the real function logic here
  return output;
};
```

Some things to note:

* Markdown Documentation in comments is enthusiastically encouraged.
* Please check for arrays first.
* Where possible, call `map()` and pass the function itself.
* After the Array check, then put your function logic and return.
* There is a [tests directory](https://github.com/AABoyles/bettermath/blob/master/tests/tests.js). Writing unit tests (for both the `math` global and the `Math` mixin) and benchmark tests for your function are enthusiastically encouraged.

### Reducers

A ton of new reducers are planned for future releases, but the need for them is slightly less urgent. Because they're more unique than mappers, there's no dogmatic design pattern. However, some guidelines will be enforced:

* In general, if the reducer takes no arguments but an array of numbers, also include a key argument and call `math.pluck(obj, key)` first thing. That will allow the reducer to act on arrays of objects, as well as arrays of numbers.

Some sources of reducers I'm planning to mine for implementations:

* https://en.wikipedia.org/wiki/Central_tendency#Measures_of_central_tendency
* https://en.wikipedia.org/wiki/Statistical_dispersion

*A note on non-commutative reducers:*

If you're curious, there's no implementation of difference or quotient because
subtraction and division are non-commutative, which makes them (modestly)
difficult to reason about in a sufficiently general way. Accordingly, it seems
better that someone who needs such a function actually implement the logic
themselves. I am open to compelling arguments otherwise, if you'd like to
[present one.](https://github.com/AABoyles/bettermath/issues/new)

### Helpers

If a function can complete its task without additional helpers, it definitely should. If you write one, please have a compelling reason (i.e. a mapper or reducer which requires it) and include an explanation in the commit message.

### Functions that don't work on Numbers or Arrays of Numbers

That's not what this library is for. Please don't submit pull requests for any.

## LICENSE

Released under the [MIT license](https://opensource.org/licenses/MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
