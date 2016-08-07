function memobind(thisArg, funcName) {
  if (typeof thisArg !== 'object' || !thisArg) {
    throw new TypeError('Invalid thisArg parameter.');
  }

  var func = thisArg[funcName];
  if (typeof func !== 'function') {
    throw new TypeError('\'' + funcName + '\' is not a function.');
  }

  if (!thisArg._memobind_cache) thisArg._memobind_cache = {};
  var cache = thisArg._memobind_cache[funcName];
  if (!cache) {
    cache = thisArg._memobind_cache[funcName] = {};
  }

  var args = Array.prototype.slice.call(arguments, 2);
  var memoKey = JSON.stringify(args);
  if (!cache[memoKey]) {
    args.unshift(thisArg);
    cache[memoKey] = Function.prototype.bind.apply(func, args);
  }
  return cache[memoKey];
}

module.exports = memobind;
