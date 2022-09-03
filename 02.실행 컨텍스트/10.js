// 함수 선언문과 함수 표현식(2) - 호이스팅을 마친상태

function sum(a, b) {
  return a + b;
}

var multiply;

console.log(sum(1, 2));
console.log(multiply(3, 4));

multiply = function (a, b) {
  return a * b;
};
