//생성자 함수

var Cat = function (name, age) {
  this.bark = "야옹";
  this.name = name;
  this.age = age;
};

var choco = new Cat("초코", 7);
var navi = new Cat("나비", 5);

console.log(choco, navi);
