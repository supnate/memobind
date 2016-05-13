function memobind(_this, funcName) {
  var cacheKey = '_memobind_cache_' + funcName;
  if (!_this[cacheKey]) _this[cacheKey] = {};
  var cache = _this[cacheKey];
  var args = Array.prototype.slice.call(arguments, 2);
  var memoKey = JSON.stringify(args);
  if (!cache[memoKey]) {
    args.unshift(_this);
    cache[memoKey] = Function.prototype.bind.apply(_this[funcName], args);
  }
  return cache[memoKey];
}

module.exports = memobind;
