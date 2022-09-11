var extendclass = (SuperClass, SubClass, subMethod) => {
  SubClass.prototype = new SuperClass();

  for (const prop in SubClass.prototype) {
    if (SubClass.hasOwnProperty.call(object, prop)) {
      delete SubClass.prototype[prop];
    }
  }
};

var ExtendsClass = (SuperClass, SubClass, SubMethod) => {
  SubClass.prototype = new SuperClass();
  for (var prop in SubClass.prototype) {
    if (SubClass.prototype.hasOwnProperty(prop)) {
      delete SubClass.prototype[prop];
    }
  }

  SubClass.prototype.Constructor = SubClass;

  if (subMethod) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method];
    }
  }
  Object.freeze(SubClass.prototype);
  return SubClass;
};
