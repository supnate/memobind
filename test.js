var memobind = require('./index.js');

var obj = {
  time: 'morning',
  hello: function(greeting, name) {
    console.log('Hello', name, ',', greeting, this.time);
  }
};

var hello = memobind(obj, 'hello', 'good');
hello('Nate');
