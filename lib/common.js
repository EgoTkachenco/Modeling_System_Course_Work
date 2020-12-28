let jStat = require('jstat');
// Exponential distribution
module.exports.getExpRandom = (lambda) => {
    return Math.log(Math.random()) * (1 / lambda) * (-1);
}
// Uniform distribution
module.exports.getUniformRandom = (low, high) => {
  return jStat.normal.sample(low, high);
    // return Math.floor(Math.random() * (high - low)) + low;
}
// Gamma distribution
module.exports.getGammaRandom = (lambda, n) => {
    if (lambda <= 0) throw new Error("lambda > 0");
    const product = Array.from(Array(n).keys())
        .map((n) => n + 1)
        .reduce((prev) => prev * Math.random(), 1);
    return (-1 / lambda) * Math.log(product);
}
// Poisson distribution
module.exports.getPoissonRandom = (lambda) => {
  return jStat.poisson.sample(lambda);
};