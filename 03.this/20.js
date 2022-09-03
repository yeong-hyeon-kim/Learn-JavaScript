// 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 Array.from
var obj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
};

var arr = Array.from(obj);

console.log(arr);
