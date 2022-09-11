var extendClass = (Super, Sub, SubMethod) => {
  Sub.prototype = new Super();
  for (let prop in Sub.prototype) {
    if (Sub.prototype.hasOwnProperty(prop)) {
      delete Sub.prototype[prop];
    }
  }

  if (SubMethod) {
    for (var method in SubMethod) {
      Sub.prototype[method] = SubMethod[method];
    }
  }
  Object.freeze(Sub.prototype)
  return Sub
};

var Square = extendClass(Rectangle, function(width){
    Rectangle.call(this,width,width)
})
