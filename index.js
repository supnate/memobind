function memobind(thisArg, funcName) {
  var func;

  if (typeof thisArg !== 'object' || !thisArg) {
    throw new TypeError('Invalid thisArg parameter.');
  }

  if (typeof thisArg[funcName] !== 'function') {
    throw new TypeError('\'' + funcName + '\' is not a function.');
  }

  func = thisArg[funcName];
  if (!func._memobind_cache) func._memobind_cache = {};
  var cache = func._memobind_cache;
  var args = Array.prototype.slice.call(arguments, 2);
  var memoKey = JSON.stringify(args);
  if (!cache[memoKey]) {
    args.unshift(thisArg);
    cache[memoKey] = Function.prototype.bind.apply(func, args);
  }
  return cache[memoKey];
}

module.exports = memobind;
