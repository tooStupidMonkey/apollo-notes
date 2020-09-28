// Task: We need generator fibonachi numbers



function fibonachiGenerator (amount = 0) {
  const result = [];

  for (let i = 0; i < amount; i++) {
    if (!result.length) {
      result.push(i);
    } else {
      result.push(result[i] + i)
    }
  }
  return result
}