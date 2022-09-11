var Grade = () => {
  constructor();
  {
    var args = Array.prototype.slice.call(arguments);

    for (let i = 0; i < args.length; i++) {
      this[i] = args[i];
    }
    this.length = args.length;
  }
};

Grade.prototype = ["a", "b", "c", "d"];
var g = new Grade(100, 80);

// delete.g.length;
g.push(90);

console.log(g);

delete g.length;
g.push(70);
console.log(g);
