function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var data = {};
var a;
var i = 0;
const {
  getExpRandom,
  getUniformRandom,
  getGammaRandom,
} = require("./lib/common.js");
for (i = 0; i < 100000; ++i) {
  a = getExpRandom(9);

  if (typeof data[a] === "undefined") {
    // first time initialize
    data[a] = 1;
  } else {
    data[a] = data[a] + 1;
  }
}



let arr = new Array(1000).fill(0);
arr = arr.map(() => getUniformRandom(3, 1));

console.log(
  arr.reduce((prev, curr) => {
    return (prev += curr);
  }, 0) / 1000
);

