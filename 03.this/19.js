var str = "abc";

// Uncaught TypeError TypeError: Cannot assign to read only property 'length' of object '[object String]'
Array.prototype.push.call(str, "pushed string");

Array.prototype.concat.call(str, "string");
Array.prototype.every.call(str, function (c) {
  return char !== " ";
});
Array.prototype.some.call(str, function (c) {
  return char === " ";
});

var newArr = Array.prototype.map.call(str, function (c) {
  return char + "!";
});

var newStr = Array.prototype.map.call(
  str,
  function (c) {
    return char + char + i;
  },
  ""
);
console.log(newArr);

var newStr = Array.prototype.reduce.apply(str, [
  function (string, char, i) {
    return string + char + i;
  },
]);

console.log(newStr);

