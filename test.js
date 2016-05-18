var memobind = require('./index.js');

var iceCreamFactory = {
  cooker: 'Nate',
  make: function(customer, color, size) {
    console.log(`Hi ${customer}, here is your ${color} and ${size} ice cream made by ${this.cooker}.`);
  }
};

var makeIceCream = memobind(iceCreamFactory, 'make', 'Kevin');
makeIceCream('pink', 'big'); // => Hi Kevin, here is your pink and big ice cream made by Nate.
