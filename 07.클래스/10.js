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
      Square.prototype = Object.create(Rectangle.prototype);
      Object.freeze(SubClass.prototype);
      return SubClass;
    };
  };
  