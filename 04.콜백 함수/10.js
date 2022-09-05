var obj1 = {
  name: "obj1",
  func: () => {
    console.log(obj1.name);
  },
};

var callback = obj1.func();
setTimeout(obj1.func, 1000);

var obj2 = {
  name: "obj2",
  func: obj1.func,
};

var callback2 = obj2.func();
setTimeout(callback2, 1500);

var obj3 = { name: "obj3" };
var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 2000);
