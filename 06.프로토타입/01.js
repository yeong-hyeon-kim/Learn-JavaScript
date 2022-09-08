var Person = (name) => {
  this._name = name;
};

Person.prototype.getName = () => {
  return this._name;
};

var suzi = new Person("Suzi");
// suzi.__proto__.getName();
// suzi.__proto__._name = "SUZI__proto__";
// suzi.__proto__.getName();

var suzi = new Person("SUZI", 28);
suzi.getName();

var iu = new Person("Jieun", 28);
iu.getName();

suzi.__proto__.getName;
