var obj1 = {
  name: "obj1",
  func: () => {
    console.log(this.name);
  },
};

var obj2 = { name: "obj2" };
setTimeout(obj1.func.bind(obj2), 1000);

