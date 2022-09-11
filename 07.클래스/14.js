var extendClass = (SuperClass, SubClass, SubMethod) => {
  SubClass.prototype = Object.create(SuperClass.prototype);
  SubClass.prototype.constructor = SubClass;
  SubClass.prototype.super = (propName) => {
    var self = this;
    if (!propName) {
      return () => {
        SuperClass.apply(self, arguments);
      };
      var prop = SuperClass.prototype[propName];
      if (typeof prop !== "function") {
        return prop;
      }

      return prop.apply(self, arguments);
    }
  };
  if (SubMethod) {
    for (var method in SubMethod) {
      SubClass.prototype[method] = SubMethod[method];
    }
  }

  Object.freeze(SubClass);
  return SubClass;
};

var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

var Square = extendClass(
  Rectangle,
  function (width) {
    this.super()(width, width);
  },
  {
    getArea: function () {
      console.log("Size is : ", this.super("getArea")());
    },
  }
);

var sq = new Square(10);
sq.getArea();
console.log(sq.super("getArea")());
