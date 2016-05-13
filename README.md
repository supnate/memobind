Memobind
===========

[![Version](http://img.shields.io/npm/v/memobind.svg)](https://www.npmjs.org/package/memobind)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A simple javascript utility for function binding memoization. It's motivated by the requirement of dynamic binding in [React](https://facebook.github.io/react/) component rendering.


Install with npm

```sh
npm install memobind
```

Use with node.js, browserify or webpack:

```js
var memobind = require('memobind');
memobind(context, methodName, ...args);
```

### Motivation
A `bind` call or [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in a JSX prop will create a brand new function on every single render. This is bad for performance, as it will result in the garbage collector being invoked way more than is necessary.

A common use case of `bind` in `render` is when rendering a list, to have a separate callback per list item:
```jsx
<ul>
  {this.props.items.map(item =>
    <li key={item.id} onClick={this.onItemClick.bind(this, item.id)}>
      ...
    </li>
  )}
</ul>
```
This is not good because it creates new functions in every update. The eslint rule [jsx-no-bind](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md) is used to detect such quality issues.

To resolve the problem, `memobind` caches the function bind result so that it could be reused if the arguments are not changed. See below example:
```jsx
<ul>
  {this.props.items.map(item =>
    <li key={item.id} onClick={memobind(this, 'onItemClick', item.id)}>
      ...
    </li>
  )}
</ul>
```

### How it works
`memobind` caches the function bind result in the `context` object, with `methodName` as the key for cache object, and `this[methodName]` is the function to bind. So the context object should not be null, it's usually the component itself. The key for function binding result is stored with the key generated from arguments using JSON.stringify. In the above example, it is `JSON.stringify([item.id])`.

If you need to call a method on the component props or other objects, wrap it as a component method. For example:
```jsx
class List extends React.Component {
  onItemClick(itemId) {
    this.props.onItemClick(itemId);
  }

  render() {
    ...
  }
}
```

`memobind` is created only for the need of `bind` with arguments. If there is no arguments, [autobind decorator](http://technologyadvice.github.io/es7-decorators-babel6/) is a better choice with ES-future transpilers support such as [Babel](http://babeljs.io/).

### Examples

Simple setState call
```jsx
<button onClick={funcBind(this, 'setState', { popupVisible: true })}>Show Dialog</button>
```

### License

[MIT](LICENSE). Copyright (c) 2016 Nate Wang.
