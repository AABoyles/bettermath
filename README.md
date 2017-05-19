# bettermath

*`Math`, but better.*

Copyright 2017 by Tony Boyles

bettermath is a javascript module for a variety of useful numerical computations on arrays of numbers.

It's designed to work seamlessly as a [mixin](https://en.wikipedia.org/wiki/Mixin) with the standard `Math` object, However, I know that extending standard globals is usually a bad idea, so it doesn't do it automatically.

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
2.5
```

## DOCUMENTATION

[We got some.](http://aaboyles.github.io/bettermath/docs)

## TESTS

[We got some.](http://aaboyles.github.io/bettermath/test) Coverage isn't awesome, but it's a work in progress.

## INSPIRATION

This project is a direct result of the fact that I'm basically an R coder. In R the fundamental datastructure is a Vector. While there isn't a perfect analog in Javascript, arrays of numbers can serve for many similar purposes. But Javascript arrays don't have a ton of useful mathematical methods. For example, to multiply the elements of a vector by a scalar in R, you'd do something like this:

```r
myVector <- c(1,2,3,4,5)
scalar <- 10
myVector * scalar
```
In contrast, javascript requires us to employ some sort of loop:

```javascript
myArray = [1,2,3,4,5];
scalar = 10;
output = [];
for(var i = 0; i < myArray.length; i++){
  output.push(i * scalar);
}
output
```

While we don't really want to mess with the primitives in javascript to make it work more like R, we can at least define a function to do the work for us.

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
myArray = [1,2,3,4,5];
scalar = 10;
scale(myArray, scalar);
```

Now, let's do that with dozens of functions. That's why this project exists.

This project started as a fork of [underscore.math](https://github.com/syntagmatic/underscore.math), but it's gotten pretty far removed for a simple fork. Some other sources of inspiration for this include:

* [underscorejs](https://underscorejs.com)
* [js-math](https://github.com/kaleb/js-math)
* [math](https://github.com/danehansen/math)
* [Mootools' Array.Math]( http://mootools.net/forge/p/array_math)
* [Simple Statistics](https://github.com/simple-statistics/simple-statistics)
* [arr-stat.js](https://gist.github.com/Daniel-Hug/7273430)

Thanks to all the developers of these!

## INTENT

The current goal of this project is to re-implement the majority of the methods available in the Math global to operate normally on [Numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), and also perform logically on arrays of numbers or arrays of objects with a given `key`.

Additionally, I aspire to write a wider variety of functions which perform tasks which are similar or related to functions already available in the Math global. For example, we have a lengthy collection of identifier functions (`isEven`, `isPositive`, etc.).

## CONTRIBUTING

If you'd like to contribute, please [fork this repo](https://github.com/AABoyles/bettermath), write an improvement, and submit a pull request.

If you'd like to contribute a new method, please adhere to the following design patterns.

### Mappers

These are the functions which are most urgently needed at this time. Pick a function in Math [that isn't in bettermath](https://aaboyles.github.io/bettermath/docs/todo.html) and implement it, like so:

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
* There is a [test file](https://github.com/AABoyles/bettermath/blob/master/test/tests.js). Writing additional tests for your function is also enthusiastically encouraged.

### Reducers

I plan to write a ton of reducers in the future, but the need for them is slightly less urgent. Because they're more unique than mappers, I don't have a specific design pattern in mind.

Some opinions I'm going to enforce:

* In general, if the reducer takes no arguments but an array of numbers, also include a key argument and call `math.pluck(obj, key)` first thing. That will allow the reducer to act on arrays of objects, as well as arrays of numbers.

Some sources of reducers I'm planning to mine for implementations:

* https://en.wikipedia.org/wiki/Central_tendency#Measures_of_central_tendency
* https://en.wikipedia.org/wiki/Statistical_dispersion

### Helpers

One thing I want to avoid is writing any more helpers than necessary. If you write one, please have a compelling reason and include it in the commit message.

### Functions that don't work on Numbers or Arrays of numbers

I know, I've got a few. Those are going to go away with bettermath 1.0.0, so don't get used to them, and please don't write any new ones.

## LICENSE

Released under the [MIT license](https://opensource.org/licenses/MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
