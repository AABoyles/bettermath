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
  ok(math.isEven(4));
  ok(!math.isEven(5));
});

test("Objects", function() {
  expect(2);
  ok(math.isEven(4));
  ok(!math.isEven(5));
});

module("Prime");

test("Numbers", function() {

});

module("Sum");

test("Arrays", function() {
  expect(3);
  equal( math.sum([1,2,3]), 6, "Easy" );
  equal( Math.PI + 0.3, math.sum([0.2,0.1,Math.PI]), "Math.PI" );
  equal( 14.2, math.sum([0,14,0.2]), "Zero" );
});

test("Objects", function() {
  expect(3);
  equal( math.sum([{value:1},{value:2},{value:3}]), 6, "Array of objects" );
  equal( math.sum([{a:1},{a:2, b:5},{a:3}], 'a'), 6, "Specify plucked key" );
  equal( math.sum({one: {a:1},two:{a:2},three: {a:3}}, 'a'), 6, "Over values of an object with specified key" );
});

module("Mean");

test("Arrays", function() {
  expect(2);
  equal( math.mean([0,0.5,1]), 0.5, "Easy" );
  equal( math.mean([0,1,2]), 1, "Another easy one" );
});

test("Objects", function() {
  expect(2);
  equal( math.mean([{a:-Math.PI},{a:Math.PI}], 'a'), 0, "Array of objects, specified key" );
  equal( math.mean({one: {a:-Math.PI}, two: {a:1}}, 'a'), (1-Math.PI)/2, "OVer values of an object with specified key" );
});

module("Scale");

test("Arrays", function() {
  expect(3);
  deepEqual( math.scale([1, 2, 5], 1), [0.2, 0.4, 1], "Scale to 1" );
  deepEqual( math.scale([1, 2, 5], 5), [1, 2, 5], "Scale to 5" );
  deepEqual( math.scale([1, 2, 5]), [0.2, 0.4, 1], "Implied 1" );
});

module("Numeric Sort");

test("Arrays", function() {
  expect(2);
  deepEqual( math.sort([0,4,7,-1]), [-1,0,4,7], "Digits, negative, zero" );
  deepEqual( math.sort([0,4,7,-1,12,21,122]), [-1,0,4,7,12,21,122], "Double digits" );
});

module("Slope");

test("Two points", function() {
  expect(4);
  equal( math.slope([0,0], [5,5]), 1, "Slope of 1" );
  equal( math.slope([0,0], [1,10]), 10, "Slope of 10" );
  equal( math.slope([0,0], [0,10]), Infinity, "Infinite slope" );
  equal( math.slope([0,0], [10,0]), 0, "Slope of 0" );
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

module("Z Score");

test("Arrays", function() {
  expect(1);
  deepEqual(
    math.zscore([1,2,3]),
    ["-1.225", "0.000", "1.225"],
    "Z Score of [1,2,3]"
  );
});

test("Objects", function() {
  expect(1);
  deepEqual(
    math.zscore([{a: 1},{a: 2},{a: 3}], 'a'),
    ["-1.225", "0.000", "1.225"],
    "Z Score of [1,2,3]"
  );
});

module("Transpose");

test("Arrays", function() {
  expect(1);
  deepEqual(
    math.transpose(
      [[1,2,3],
       [4,5,6],
       [7,8,9]]),
      [[1,4,7],
       [2,5,8],
       [3,6,9]],
      "Tranpose 3x3"
    );
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
  deepEqual(math.movingAvg([1,2,3,4,5,6,7,8,9,10], 3), [2,3,4,5,6,7,8,9]);
});

test("Moving Average", function() {
  expect(2);

  deepEqual(
    math.movingAvg([1,2,3,4,5,6,7,8,9,10], 4), [2.5,3.5,4.5,5.5,6.5,7.5,8.5]
  );

  deepEqual(
    math.movingAvg([1,2,3,4,5,6,7,8,9,10], 3), [2,3,4,5,6,7,8,9]
  );
});
