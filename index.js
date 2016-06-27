function memobind(_this, funcName) {
  var func;

  if (!_this) {
    throw new Error('!_this === true');
  }

  if (!_this[funcName]) {
    throw new Error('Cannot find \'' + funcName + '\'.');
  }

  func = _this[funcName];
  if (!func._memobind_cache) func._memobind_cache = {};
  var cache = func._memobind_cache;
  var args = Array.prototype.slice.call(arguments, 2);
  var memoKey = JSON.stringify(args);
  if (!cache[memoKey]) {
    args.unshift(_this);
    cache[memoKey] = Function.prototype.bind.apply(func, args);
  }
  return cache[memoKey];
}

module.exports = memobind;
