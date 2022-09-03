var numbers = [10, 20, 3, 16, 45];
var max = (min = numbers[0]);

numbers.forEach((number) => {
  if (number > max) {
    max = number;
  }

  if (number < min) {
    min = number;
  }
});

console.log(max, min);