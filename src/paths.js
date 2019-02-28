let path = require('path');
const pathType = (path) => {
  return pathType.isAbsolute(path);
};

// let path = require('path');
// let fileRoute = path.isAbsolute('path.js');
// let routeArr = [];
// if (!fileRoute) {
//   routeArr.push(path.resolve('path.js'));
// } else {
//   routeArr.push(path);
// }
// console.log(routeArr);