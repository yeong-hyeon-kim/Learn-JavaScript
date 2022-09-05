var obj1 = {
  name: "obj1",
  func: () => {
    console.log(obj1.name);
  },
};

setTimeout(obj1.func, 1000);
