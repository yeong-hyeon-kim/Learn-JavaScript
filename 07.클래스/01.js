var Rectangle = (width, height) => {
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

Rectangle.isRectangle = (instance) => {
  return (
    instance instanceof Rectangle && instance.width > 0 && instance.height > 0
  );
};

var rect1 = new Rectangle(3, 4);
console.log(rect1.getArea());
// console.log(rect1.isRectangle(rect1))
console.log(Rectangle.isRectangle(rect1));
