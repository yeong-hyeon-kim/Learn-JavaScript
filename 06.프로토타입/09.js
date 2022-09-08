Object.prototype.getEntries = () => {
  var res = [];
  for (let prop in this) {
    if (this.hasOwnProperty(prop)) {
      res.push([prop, this[prop]]);
    }
  }
  return res;
};

var data = [
  ["object", { a: 1, b: 2, c: 3 }],
  ["number", 345],
  ["string", "abc"],
  ["boolean", false],
  ["func", () => {}],
  ["array", [1, 2, 3, 4, 5]],
];

data.forEach((datum) => {
  console.log(datum[1].getEntries());
});
