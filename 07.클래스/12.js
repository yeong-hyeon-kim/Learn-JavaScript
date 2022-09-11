var extendClass2 = (function () {
  var Bridge = function () {
    return function (SuperClass, SubMethod, SubMethod) {
      Bridge.prototype = SuperClass.prototype;
      SubClass.prototype = new Bridge();
      SubClass.prototype.constructor = SuperClass;
      Bridge.prototype.constructor = SuperClass;

      if (SubMethod) {
        for (var method in SubMethod) {
          SubClass.prototype[method] = SubMethods[method];
        }
      }
    };

    Object.freeze(SubClass.prototype);
    return SubClass;
  };
})();
