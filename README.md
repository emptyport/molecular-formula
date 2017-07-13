# molecular-formula
A simple library to work with molecular formula.

View on npm [here](https://www.npmjs.com/package/molecular-formula).


## Installation
npm install molecular-formula --save

## Usage
To use this module, import it and then create a new molecular formula.
``` javascript
var molFormula = require('molecular-formula');
var water = new molFormula('H2O');
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

## Tests
You can run `npm test` to run the tests after installing the development dependencies.

## Future functionality
Molecular weights will be added next to this module along with the ability to add/subtract atoms to and from an existing formula.

## License
This software is released under the MIT license
