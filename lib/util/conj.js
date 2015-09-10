var extend = require("./extend");

function conj(a, b) {
  return extend(extend({}, a), b);
}

module.exports = conj;
