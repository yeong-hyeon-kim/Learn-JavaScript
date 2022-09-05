Array.prototype.map = (callback, index) => {
  var mapperArr = [];
  for (let i = 0; i < this.length; i++) {
    var mapperValue = callback.call(thisArg || window, this[i], i, this);
    mapperArr[i] = mapperValue;
  }
  return mapperArr;
};
