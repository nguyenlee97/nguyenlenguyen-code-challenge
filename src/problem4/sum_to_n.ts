function sum_to_n_a(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    return 0;
  }

  return (n * (n + 1)) / 2;
}
// Time complexity: O(1), Space complexity: O(1)
//This is the best way of calculating sum to n because it follow a mathematical approach, which lead to it having the best time complexity and space complexity

function sum_to_n_b(n: number): number {
  let sum: number = 0;

  if (n <= 0) return 0;

  for (let i: number = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}
// Time complexity: O(n), Space complexity: O(1)

function sum_to_n_c(n: number): number {
  function tailRecursiveSum(current: number, accumulator: number): number {
    if (current <= 0) return accumulator;
    return tailRecursiveSum(current - 1, accumulator + current);
  }

  return n <= 0 ? 0 : tailRecursiveSum(n, 0);
}
// Time complexity: O(n), Space complexity: O(n) (due to call stack)
