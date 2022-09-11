var extendClass3 = (SuperClass, SubClass, SubMethod) => {
  SubClass.prototype = Object.create(SuperClass.prototype);
  SubClass.prototype.constructor = SubClass;

  if (SubMethod) {
    for (var method in SubClass) {
      SubClass.prototype[method] = SubClass[method];
    }
  }

  Object.freeze(SubClass.prototype);
  return SubClass;
};
