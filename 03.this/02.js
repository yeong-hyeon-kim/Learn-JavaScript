// 전역 공간에서의 this
console.log(this);
// Node.js 환경
console.log(global);
// 브라우저 환경
console.log(window);

console.log(this === global);
console.log(this === window);
