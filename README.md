# molecular-formula

[![Build Status](https://travis-ci.org/emptyport/molecular-formula.svg?branch=master)](https://travis-ci.org/emptyport/molecular-formula)
[![codecov](https://codecov.io/gh/emptyport/molecular-formula/branch/master/graph/badge.svg)](https://codecov.io/gh/emptyport/molecular-formula)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


A simple library to work with molecular formula.

View on npm [here](https://www.npmjs.com/package/molecular-formula).


## Installation
npm install molecular-formula --save

## Usage
#### Creating a new molecular formula and accessing the formula
To use this module, import it and then create a new molecular formula.
``` javascript
var molFormula = require('molecular-formula');
var water = new molFormula('H2O');
```

Subscripts are also now supported thanks to [AprilArcus](https://github.com/AprilArcus)!
``` javascript
var water = new molFormula('H₂O');
```

You can retrieve the original formula like so.
``` javascript
var original_formula = water.getFormula();
```

You also have access to the elemental composition.
``` javascript
var composition = water.getComposition();
```

Output:
```
{
  H: 2,
  O: 1
}
```
Creating formula with parantheses is also supported.
``` javascript
var ammonium_phosphate = new molFormula('(NH4)3PO4');
```
There is a method for providing the simplified, condensed molecular formula in cases like this.
``` javascript
var simplified_formula = ammonium_phosphate.getSimplifiedFormula();
```
Output:
```
N3H12PO4
```
This can be useful in cases where perhaps you have a carbon chain where all the components are kept separate (e.g. CH3(CH2)4CH2OH).

#### Adding and subtracting elements
You also have the ability to add and subtract elements from the formula with the ```add``` and ```subtract``` functions. You can pass in either a string representation of what you want to add or a JSON object.

Example usage:
``` javascript
ammonium_phosphate.add('NaCl');
ammonium_phosphate.getSimplifiedFormula();
// This will give you N3H12PO4NaCl
ammonium_phosphate.subtract({ 'Na': 1, 'Cl': 1 });
ammonium_phosphate.getSimplifiedFormula();
// This will give you N3H12PO4 again
```

*Please note that once you add or subtract elements, the getFormula() function will return the same thing as the getSimplifiedFormula() function.*

#### Molecular mass
You can retrieve the molecular mass of a formula by using the ```getMass()``` function.

Example usage:
``` javascript
water.getMass();
// This gives 18.01528
```

## Tests
You can run `npm test` to run the tests after installing the development dependencies.

## Contributors
[<img src="https://avatars1.githubusercontent.com/u/2045543?s=400&v=4" width="75px;"/><br /><sub><b>April Arcus</b></sub>](https://github.com/AprilArcus)<br />
[💻](https://github.com/emptyport/molecular-formula/commits?author=AprilArcus "Code")
[⚠️](https://github.com/emptyport/molecular-formula/commits?author=AprilArcus "Tests")

## Future functionality
There are currently no planned improvements to this module. I am open to suggestions so let me know if you think something is missing.

## License
This software is released under the MIT license

## Support this project!

[![Support this project on Patreon!](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/MikeTheBiochem)