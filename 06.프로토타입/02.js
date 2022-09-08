var Constructor = (name) => {
  this.name = name;
};

Constructor.prototype.method1 = () => {};

Constructor.prototype.property1 = "Constructor Prototype Property";

var instance = new Constructor("Instance");
console.dir(Constructor);
console.dir(instance);
