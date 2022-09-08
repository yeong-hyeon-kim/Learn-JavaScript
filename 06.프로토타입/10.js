var Grade = () => {
  var args = Array.prototype.splice.call(arguments);
  for (let i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};

Grade.prototype = [];

var g = new Grade(100, 80);
console.log(g);
g.pop();
console.log(g);
g.push();
console.log(g);
