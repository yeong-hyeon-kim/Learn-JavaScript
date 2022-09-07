var debounce = (eventName, func, wait) => {
  var timeoutId = null;

  return (event) => {
    var self = this;
    console.log(eventName, "Event 발생");
    clearTimeout(timeoutId);
    timeoutId(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};

var moveHandler = (e) => {
  console.log("Move Event 처리");
};

var WheelHandler = (e) => {
  console.log("Wheel Event 처리");
};

document.body.addEventListener("mousemove", debounce("move", moveHandler, 500));
document.body.addEventListener(
  "mousewheel",
  debounce("wheel", WheelHandler, 700)
);
