var memobind = require('./index.js');
var expect = require('chai').expect;

describe('memobind', function() {
  var iceCreamFactory = {
    cooker: 'Nate',
    make: function(customer, color, size) {
      return `Hi ${customer}, here is your ${color} and ${size} ice cream made by ${this.cooker}.`;
    }
  };

  it('should return pink and big ice cream', function() {
    var makeIceCream = memobind(iceCreamFactory, 'make', 'Kevin');

    expect(makeIceCream('pink', 'big')).to.match(/^Hi Kevin, here is your pink and big ice cream made by Nate\.$/);
  });

  it('should throw error with invalid parameter', function() {
    expect(memobind.bind(null, 1)).to.throw(TypeError);
    expect(memobind.bind(null, null)).to.throw(TypeError);
    expect(memobind.bind(null, {}, 'test')).to.throw(TypeError);
  });
});
