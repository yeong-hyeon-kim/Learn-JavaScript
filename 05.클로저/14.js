var partial = () => {
  var originalParitalArgs = arguments;
  var func = originalParitalArgs[0];

  if (typeof func !== "function") {
    throw new Error("첫 번째 인자가 함수가 아닙니다.");
  }
  return () => {
    var partialArgs = Array.prototype.slice(originalParitalArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

var add = () => {
  var result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result = array[i];
  }
  return result;
};

var addPartial = partial(add, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10));

var dog = {
  name: "강아지",
  greet: partial((prefix, suffix) => {
    return prefix + this.name + suffix;
  }, "컹컹"),
};
dog.greet("입니다.");
