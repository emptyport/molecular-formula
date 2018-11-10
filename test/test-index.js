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

  it('formula for Na2(OH)2CH4(Na(Cl)2)2U(CN) matches', function() {
    formula.getFormula().should.equal('Na2(OH)2CH4(Na(Cl)2)2U(CN)');
  });

  it('simplified formula for Na2(OH)2CH4(Na(Cl)2)2U(CN) matches', function() {
    formula.getSimplifiedFormula().should.equal('Na4O2H6C2Cl4UN');
  });

  it('composition for Na2(OH)2CH4(Na(Cl)2)2U(CN) matches', function() {
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

describe('Unicode Subscripts', function() {
  formula = new molFormula('Na₂(OH)₂CH₄(Na(Cl)₂)₂U(CN)');

  it('formula for Na₂(OH)₂CH₄(Na(Cl)₂)₂U(CN) matches', function() {
    formula.getFormula().should.equal('Na2(OH)2CH4(Na(Cl)2)2U(CN)');
  });

  it('simplified formula for Na₂(OH)₂CH₄(Na(Cl)₂)₂U(CN) matches', function() {
    formula.getSimplifiedFormula().should.equal('Na4O2H6C2Cl4UN');
  });

  it('composition for Na₂(OH)₂CH₄(Na(Cl)₂)₂U(CN) matches', function() {
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

describe('Adding and Subtracting Formulae', function() {
  methyl = new molFormula('CH3');

  it('can add string', function() {
    methyl.add('(CH3)2');
    methyl.getSimplifiedFormula().should.equal('C3H9');
    methyl.getFormula().should.equal('C3H9');
  });

  it('can add json', function() {
    methyl.add({'C': 1, 'Na': 2});
    methyl.getSimplifiedFormula().should.equal('C4H9Na2');
    methyl.getFormula().should.equal('C4H9Na2');
  });

  it('can subtract string', function() {
    methyl.subtract('(NaCl)2');
    methyl.getSimplifiedFormula().should.equal('C4H9');
    methyl.getFormula().should.equal('C4H9');
  });

  it('can subtract json', function() {
    methyl.subtract({'C': 3, 'H': 6});
    methyl.getSimplifiedFormula().should.equal('CH3');
    methyl.getFormula().should.equal('CH3');
  });
});

describe('Multiple digits after parantheses', function() {
  carbon_chain = new molFormula('(CH2)10');

  it('parses correctly', function() {
    carbon_chain.getSimplifiedFormula().should.equal('C10H20');
  });
});

describe('Molecular Masses', function() {
  water = new molFormula('H2O');
  decane = new molFormula('CH3(CH2)8CH3');
  
  it('water mass is correct', function() {
    water.getMass().should.equal(18.01528);
  });

  it('decane mass is correct', function() {
    decane.getMass().should.equal(142.28208);
  });
});
