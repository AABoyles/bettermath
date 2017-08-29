module("Setup");

Object.assign(Math, math);

module("Helpers");

test("Array", () => {
  expect(4);
  ok(Math.isArray([]), "Empty Array");
  ok(Math.isArray([1,2,3,4,5,6]), "Populated Array");
  ok(!Math.isArray({a: 7}), "Non-Array Object");
  ok(!Math.isArray("Foobar"), "Non-Array String");
});

module("Pluck");

test("Pluck", () => {
  expect(3);
  equal(Math.pluck(4), 4, "Simple Numbers");
  deepEqual(Math.pluck([1,2,3,4]), [1,2,3,4], "Simple Array");
  deepEqual(Math.pluck([{a:1},{a:2},{a:3},{a:4}], 'a'), [1,2,3,4], "Array of objects");
});

module("Even/Odd");

test("Numbers", function() {
  expect(4);
  ok(Math.isEven(4));
  ok(!Math.isEven(5));
  ok(!Math.isOdd(4));
  ok(Math.isOdd(5));
});

test("Arrays", function() {
  expect(2);
  deepEqual(Math.isEven([4, 501]), [true, false]);
  deepEqual(Math.isOdd([5, 502]), [true, false]);
});

test("Objects", function() {
  expect(2);
  deepEqual(Math.isEven([{a: 4}, {a: 501}], 'a'), [true, false]);
  deepEqual(Math.isOdd([{a: 5}, {a: 502}], 'a'), [true, false]);
});

module("Prime");

test("Numbers", function() {
  expect(4);
  ok(Math.isPrime(97), "Prime");
  ok(!Math.isPrime(100), "Not Prime");
  ok(Math.isComposite(16), "Composite");
  ok(!Math.isComposite(13), "Not Composite");
});

test("Arrays", function() {
  expect(2);
  deepEqual(Math.isPrime([100, 200, 2]), [false, false, true], "Checking Primes");
  deepEqual(Math.isComposite([100, 200, 2]), [true, true, false], "Checking Composites");
});

module("Square");

test("Numbers", () => {
  expect(1);
  ok(Math.square(2), 4, "Easy Case");
});

test("Arrays", () => {
  expect(1);
  deepEqual(Math.square([1, 2, 3, 4, 10]), [1, 4, 9, 16, 100], "Easy Case");
});

test("Objects", () => {
  expect(1);
  deepEqual(Math.square([{'a':1}, {'a': 2}, {'a': 8}], 'a'), [1, 4, 64]);
});

module("Sum");

test("Arrays", function() {
  expect(3);
  equal( Math.sum([1,2,3]), 6, "Easy" );
  equal( Math.PI + 0.3, Math.sum([0.2,0.1,Math.PI]), "Math.PI" );
  equal( 14.2, Math.sum([0,14,0.2]), "Zero" );
});

test("Objects", function() {
  expect(2);
  equal( Math.sum([{value:1},{value:2},{value:3}]), 6, "Array of objects" );
  equal( Math.sum([{a:1},{a:2, b:5},{a:3}], 'a'), 6, "Specify plucked key" );
});

module("Mean");

test("Arrays", function() {
  expect(2);
  equal( Math.mean([0,0.5,1]), 0.5, "Easy" );
  equal( Math.mean([0,1,2]), 1, "Another easy one" );
});

test("Objects", function() {
  expect(1);
  equal( Math.mean([{a:-Math.PI},{a:Math.PI}], 'a'), 0, "Array of objects, specified key" );
});

module("Scale");

test("Arrays", function() {
  expect(2);
  deepEqual( Math.scale01([1, 2, 5]), [0, 0.25, 1], "Scale to 1" );
  deepEqual( Math.scale([1, 2, 5], 1, 100), [1, 2, 5], "Scale to 100" );
});

module("Numeric Sort");

test("Arrays", function() {
  expect(3);
  deepEqual( Math.sort([0,4,7,-1]), [-1,0,4,7], "Digits, negative, zero" );
  deepEqual( Math.sort([0,4,7,-1,12,21,122]), [-1,0,4,7,12,21,122], "Double digits" );
  deepEqual( Math.sort([0,4,7,-1,12,21,122], true), [122, 21, 12, 7, 4, 0, -1], "Descending" );
});

module("Median");

test("Arrays", function() {
  expect(5);
  equal( Math.median([0,0,0,0,5]), 0, "Median of 0" );
  equal( Math.median([0,0,1,2,5]), 1, "Median of 5 numbers" );
  equal( Math.median([0,0,1,2]), 0.5, "(0 + 1)/2" );
  equal( Math.median([0,0,1,2,3,4]), 1.5, "(1 + 2)/2" );

  var no_mutate = [4,3,2,1];
  Math.median(no_mutate);
  deepEqual(no_mutate, [4,3,2,1], "Original array not mutated" );
});

module("Variance");

test("Arrays", function() {
  expect(1);
  equal( Math.variance([1,2,3]), 2/3, "Variance of [1,2,3]" );
});

module("Standard Deviation");

test("Arrays", function() {
  expect(1);
  equal( Math.stdDeviation([1,2,3]), Math.sqrt(2/3), "Variance of [1,2,3]" );
});

module("Power (Exponent)");
test("Numbers", function() {
  expect(2);
  equal( Math.pow(2, 5), 32, "2^5 = 32");
  equal( Math.pow(0.5, 2), 0.25, "0.5^2 = 0.25");
});

test("Arrays", function() {
  expect(1);
  deepEqual( Math.pow([2,3,4], 2), [4,9,16], "[2,3,4] -> [4,9,16]");
});

test("Moving Average", function() {
  expect(1);
  deepEqual(
    Math.movingAvg([1,2,3,4,5,6,7,8,9,10], 3),
    [2,3,4,5,6,7,8,9]
  );
});

test("Moving Average", function() {
  expect(2);

  deepEqual(
    Math.movingAvg([1,2,3,4,5,6,7,8,9,10], 4),
    [2.5,3.5,4.5,5.5,6.5,7.5,8.5]
  );

  deepEqual(
    Math.movingAvg([1,2,3,4,5,6,7,8,9,10], 3),
    [2,3,4,5,6,7,8,9]
  );
});
