var NewConstructor = () => {
  console.log("this is new constructor.");
};

var dataTypes = [
  1,
  "test",
  true,
  {},
  [],
  () => {},
  /test/,
  new Number(),
  new String(),
  new Boolean(),
  new Object(),
  new Array(),
  new RegExp(),
  new Date(),
  new Error(),
];

dataTypes.forEach((d) => {
  d.constructor = NewConstructor;
  console.log(d.constructor.name, "&", d instanceof NewConstructor);
});
