function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = () => {
  return this.width * this.height;
};

var rect = new Rectangle(3, 4);
console.log(rect.getArea());

function Square(width) {
  this.width = width;
  this.height = width;
}

Square.prototype.getArea = () => {
  return (this.width = this.height);
};

var sq = new Square(5);
console.log(sq.getArea());

console.dir(sq)
console.dir(sq)