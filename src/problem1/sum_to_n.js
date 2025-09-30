var sum_to_n_a = function (n) {
  if (!Number.isInteger(n) || n < 0) {
    return 0;
  }

  return (n * (n + 1)) / 2;
};
// Time complexity: O(1), Space complexity: O(1)

var sum_to_n_b = function (n) {
  var sum = 0;

  if (!Number.isInteger(n) || n < 0) {
    return 0;
  }

  for (var i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};
// Time complexity: O(n), Space complexity: O(1)

var sum_to_n_c = function (n) {
  function tailRecursiveSum(current, accumulator) {
    if (current <= 0) return accumulator;
    return tailRecursiveSum(current - 1, accumulator + current);
  }

  return n <= 0 ? 0 : tailRecursiveSum(n, 0);
};
// Time complexity: O(n), Space complexity: O(n) (due to call stack)
