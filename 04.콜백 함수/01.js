var count = 0;
var timer = setInterval(() => {
  console.log(count);
  if (++count > 4) {
    clearInterval(timer);
  }
}, 300);
