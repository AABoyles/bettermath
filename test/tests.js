module("Helpers");

test("Array", () => {
  expect(4);
  ok(math.isArray([]), "Empty Array");
  ok(math.isArray([1,2,3,4,5,6]), "Populated Array");
  ok(!math.isArray({a: 7}), "Non-Array Object");
  ok(!math.isArray("Foobar"), "Non-Array String");
});

module("Pluck");

test("Pluck", () => {
  expect(3);
  equal(math.pluck(4), 4, "Simple Numbers");
  deepEqual(math.pluck([1,2,3,4]), [1,2,3,4], "Simple Array");
  deepEqual(math.pluck([{a:1},{a:2},{a:3},{a:4}], 'a'), [1,2,3,4], "Array of objects");
});

module("Even/Odd");

test("Numbers", function() {
  expect(4);
  ok(math.isEven(4));
  ok(!math.isEven(5));
  ok(!math.isOdd(4));
  ok(math.isOdd(5));
});

test("Arrays", function() {
  expect(2);
  deepEqual(math.isEven([4, 501]), [true, false]);
  deepEqual(math.isOdd([5, 502]), [true, false]);
});

test("Objects", function() {
  expect(2);
  deepEqual(math.isEven([{a: 4}, {a: 501}], 'a'), [true, false]);
  deepEqual(math.isOdd([{a: 5}, {a: 502}], 'a'), [true, false]);
});

module("Prime");

test("Numbers", function() {
  expect(4);
  ok(math.isPrime(97), "Prime");
  ok(!math.isPrime(100), "Not Prime");
  ok(math.isComposite(16), "Composite");
  ok(!math.isComposite(13), "Not Composite");
});

test("Arrays", function() {
  expect(2);
  deepEqual(math.isPrime([100, 200, 2]), [false, false, true], "Checking Primes");
  deepEqual(math.isComposite([100, 200, 2]), [true, true, false], "Checking Composites");
});

module("Square");

test("Numbers", () => {
  expect(1);
  ok(math.square(2), 4, "Easy Case");
});

test("Arrays", () => {
  expect(1);
  deepEqual(math.square([1, 2, 3, 4, 10]), [1, 4, 9, 16, 100], "Easy Case");
});

test("Objects", () => {
  expect(1);
  deepEqual(math.square([{'a':1}, {'a': 2}, {'a': 8}], 'a'), [1, 4, 64]);
});

module("Sum");

test("Arrays", function() {
  expect(3);
  equal( math.sum([1,2,3]), 6, "Easy" );
  equal( Math.PI + 0.3, math.sum([0.2,0.1,Math.PI]), "Math.PI" );
  equal( 14.2, math.sum([0,14,0.2]), "Zero" );
});

test("Objects", function() {
  expect(2);
  equal( math.sum([{value:1},{value:2},{value:3}]), 6, "Array of objects" );
  equal( math.sum([{a:1},{a:2, b:5},{a:3}], 'a'), 6, "Specify plucked key" );
});

module("Mean");

test("Arrays", function() {
  expect(2);
  equal( math.mean([0,0.5,1]), 0.5, "Easy" );
  equal( math.mean([0,1,2]), 1, "Another easy one" );
});

test("Objects", function() {
  expect(1);
  equal( math.mean([{a:-Math.PI},{a:Math.PI}], 'a'), 0, "Array of objects, specified key" );
});

module("Scale");

test("Arrays", function() {
  expect(2);
  deepEqual( math.scale01([1, 2, 5]), [0, 0.25, 1], "Scale to 1" );
  deepEqual( math.scale([1, 2, 5], 1, 100), [1, 2, 5], "Scale to 100" );
});

module("Numeric Sort");

test("Arrays", function() {
  expect(3);
  deepEqual( math.sort([0,4,7,-1]), [-1,0,4,7], "Digits, negative, zero" );
  deepEqual( math.sort([0,4,7,-1,12,21,122]), [-1,0,4,7,12,21,122], "Double digits" );
  deepEqual( math.sort([0,4,7,-1,12,21,122], true), [122, 21, 12, 7, 4, 0, -1], "Descending" );
});

module("Median");

test("Arrays", function() {
  expect(5);
  equal( math.median([0,0,0,0,5]), 0, "Median of 0" );
  equal( math.median([0,0,1,2,5]), 1, "Median of 5 numbers" );
  equal( math.median([0,0,1,2]), 0.5, "(0 + 1)/2" );
  equal( math.median([0,0,1,2,3,4]), 1.5, "(1 + 2)/2" );

  var no_mutate = [4,3,2,1];
  math.median(no_mutate);
  deepEqual(no_mutate, [4,3,2,1], "Original array not mutated" );
});

module("Variance");

test("Arrays", function() {
  expect(1);
  equal( math.variance([1,2,3]), 2/3, "Variance of [1,2,3]" );
});

module("Standard Deviation");

test("Arrays", function() {
  expect(1);
  equal( math.stdDeviation([1,2,3]), Math.sqrt(2/3), "Variance of [1,2,3]" );
});

module("Power (Exponent)");
test("Numbers", function() {
  expect(2);
  equal( math.pow(2, 5), 32, "2^5 = 32");
  equal( math.pow(0.5, 2), 0.25, "0.5^2 = 0.25");
});

test("Arrays", function() {
  expect(1);
  deepEqual( math.pow([2,3,4], 2), [4,9,16], "[2,3,4] -> [4,9,16]");
});

test("Moving Average", function() {
  expect(1);
  deepEqual(
    math.movingAvg([1,2,3,4,5,6,7,8,9,10], 3),
    [2,3,4,5,6,7,8,9]
  );
});

test("Moving Average", function() {
  expect(2);

  deepEqual(
    math.movingAvg([1,2,3,4,5,6,7,8,9,10], 4),
    [2.5,3.5,4.5,5.5,6.5,7.5,8.5]
  );

  deepEqual(
    math.movingAvg([1,2,3,4,5,6,7,8,9,10], 3),
    [2,3,4,5,6,7,8,9]
  );
});
