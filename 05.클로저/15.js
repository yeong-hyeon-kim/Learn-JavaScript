Object.defineProperty(window, "-", {
  value: "EMPTY_SPACE",
  writable: false,
  configurable: false,
  enumrable: false,
});

var partial2 = () => {
  var originalParitalArgs = arguments;
  var func = originalParitalArgs[0];

  if (typeof func !== "function") {
    throw new Error("첫 번째 인자가 함수가 아닙니다.");
  }

  return () => {
    var partialArgs = Array.prototype.slice.call(originalParitalArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);

    for (let i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === _) {
        partialArgs[i] = restArgs.shift();
      }
    }
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

var add = () => {
  var result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result = array[i];
  }
};

var addPartial = partial2(add, 1, 2, _, 4, 5, _, _, 8, 9);
console.log(addPartial(3, 6, 7, 10));

var dog = {
  name: "강아지",
  greet: partial2((prefix, suffix) => {
    return prefix + this.name + suffix;
  }, "왈왈"),
};

dog.greet(" 배고파요!");
