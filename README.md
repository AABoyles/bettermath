# bettermath

*`Math`, but better.*

Copyright 2017 by Tony Boyles

bettermath is a javascript module for a variety of useful numerical computations on arrays of numbers.

It's designed to work seamlessly as a [mixin](https://en.wikipedia.org/wiki/Mixin) with the standard `Math` object, However, I know that messing with standard globals makes some people sick to their stomachs, so it doesn't do it automatically.

## INSTALLATION

It's intended to be browser- and node- compatible, so...

### Browser

If you don't already have [underscore](http://underscorejs.org/) or [lodash](https://lodash.com/) included in your file, you'll need to include that first.

Then, [Download bettermath](https://raw.githubusercontent.com/AABoyles/BetterMath/master/BetterMath.js) and include it in your html file:

```html
<script src="bettermath.js"></script>
```

You can now access it from the `math` global (sorry). (Note the lower-case 'm').

### Node,js

It's [live on npm](https://www.npmjs.com/package/bettermath), so...

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
_.extend(Math, math);
```

Otherwise, you can just access everything through `math`.

```javascript
math.median([1,2,3,4])
2.5
````

## DOCUMENTATION

[We got some.](http://aaboyles.github.io/bettermath/docs)

## TESTS

[We got some.](http://aaboyles.github.io/bettermath/test) Coverage isn't awesome, but it's a work in progress.

## INSPIRATION

This project is a direct result of the fact that I'm basically an R coder. In R the fundamental datastructure is a Vector. While there isn't a perfect analog in Javascript, arrays of numbers can serve for many similar purposes. But Javascript arrays don't have a ton of useful mathematical methods. For example, to multiply the elements of a vector by a scalar in R, you'd do something like this:

```R
myVector <- c(1,2,3,4,5)
scalar <- 10
myVector * scalar
```
In contrast, javascript requires us to employ some sort of loop:

```javascript
myArray = [1,2,3,4,5];
scalar = 10;
myArray.map(function(i){return i * scalar});
```

While we don't really want to mess with the primitives in javascript to make it work more like R, we can at least define a function to do the work for us.

```javascript
function scale(vector, scalar){
  return vector.map(function(i){return i * scalar});
}
```

Now, instead of thinking through the loop structure, we've abstracted it away to a reusable function. Now, let's do that with dozens of functions. That's why this project exists.

This project started as a fork of [underscore.math](https://github.com/syntagmatic/underscore.math), but it's gotten pretty far removed for a simple fork. Some other sources of inspiration for this include:

* [underscorejs](https://underscorejs.com)
* [js-math](https://github.com/kaleb/js-math)
* [math](https://github.com/danehansen/math)
* [Mootools' Array.Math]( http://mootools.net/forge/p/array_math)
* [Simple Statistics](https://github.com/simple-statistics/simple-statistics)

Thanks to all the developers of these!

## LICENSE

Released under the [MIT license](https://opensource.org/licenses/MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
