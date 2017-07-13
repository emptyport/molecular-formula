var should = require('chai').should();
var molFormula = require('../index');

describe('Molecular Formula', function() {
  empty = new molFormula('');

  it('returns {} for composition if blank string passed in', function() {
    empty.getComposition().should.deep.equal({});
  });
});

describe('Simple Formula', function() {
  mf = new molFormula('H2O');

  it('formula for H2O matches', function() {
    mf.getFormula().should.equal('H2O');
  });

  it('simplified formula for H2O matches', function() {
    mf.getSimplifiedFormula().should.equal('H2O');
  });

  it('composition for H2O matches', function() {
    var composition = mf.getComposition();
    Object.keys(composition).length.should.equal(2);
    composition['H'].should.equal(2);
    composition['O'].should.equal(1);
    mf.getComposition().should.deep.equal({ H: 2, O: 1});
  });
});

describe('Complex Formula', function() {
  formula = new molFormula('Na2(OH)2CH4(Na(Cl)2)2U(CN)');

  it('formula for H2O matches', function() {
    formula.getFormula().should.equal('Na2(OH)2CH4(Na(Cl)2)2U(CN)');
  });

  it('simplified formula for H2O matches', function() {
    formula.getSimplifiedFormula().should.equal('Na4O2H6C2Cl4UN');
  });

  it('composition for H2O matches', function() {
    var composition = formula.getComposition();
    Object.keys(composition).length.should.equal(7);
    composition['Na'].should.equal(4);
    composition['O'].should.equal(2);
    composition['H'].should.equal(6);
    composition['C'].should.equal(2);
    composition['Cl'].should.equal(4);
    composition['U'].should.equal(1);
    composition['N'].should.equal(1);
    formula.getComposition().should.deep.equal({ Na: 4, O: 2, H: 6, C: 2, Cl: 4, U: 1, N: 1});
  });
});