var extendClass = function () {
  var Bridge = function () {};

  return function (SuperClass, SubClass, subMethod) {
    Bridge.prototype = SuperClass.prototype;
    SubClass.prototype = new Bridge();

    if (subMethod) {
      for (var method in subMethods) {
        SubClass.prototype[method] = subMethod[method];
      }
    }

    Object.freeze(SubClass.prototype);
    return SubClass;
  };
};
