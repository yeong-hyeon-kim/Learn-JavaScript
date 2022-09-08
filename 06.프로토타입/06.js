var Person = (name) => {
  this.name = name;
};

Person.prototype.getName = () => {
  return this.name;
};

// console.log(getName)

var iu = new Person("지금");
iu.getName = () => {
  return "바로 " + this.name;
};

Person.prototype.name = "이지금";

// console.log(iu.getName());
console.log(iu.__proto__.getName());
console.log(iu.__proto__.getName.call(iu));
