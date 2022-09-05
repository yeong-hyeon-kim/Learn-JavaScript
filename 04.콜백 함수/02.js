var count = 0;
var cbFunc = () => {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
};

var timer = setInterval(cbFunc, 300);
