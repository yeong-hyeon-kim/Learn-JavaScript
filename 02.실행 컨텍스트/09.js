// 함수 선언문과 함수 표현식(1) - 원본 코드

console.log(sum(1, 2));
console.log(multiply(3, 4));

function sum(a, b) {
  return a + b;
}

var multiply = function (a, b) {
  return a * b;
};
