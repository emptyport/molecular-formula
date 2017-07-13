var isoAbund = require('isotope-abundances');

module.exports = class MolecularFormula {
  constructor(mf) {
    this.formula = mf;
    this.composition = this.createComposition();
  }

  getFormula() {
    return this.formula;
  }

  getComposition() {
    return this.composition;
  }

  createComposition() {
    return this.formulaToJson();
  }

  formulaToJson() {
    var l = this.formula.split("");
    var currentElem = "";
    var currentCount = "";
    var elemList = [];
    var json = {};

    for(var i=0; i<l.length; i++) {
      if(currentElem.length > 0 && this.isUpperCase(l[i])) {
        if(currentCount.length === 0) { currentCount = "1"; }
        elemList.push([currentElem, currentCount]);
        currentElem = "";
        currentCount = "";
      }

      if(currentElem.length === 0 && this.isUpperCase(l[i])){
        currentElem = l[i]
      }

      if(currentElem.length === 1 && this.isLowerCase(l[i])){
        currentElem += l[i];
      }

      if(currentElem.length > 0 && this.isNumber(l[i])) {
        currentCount += l[i];
      }      
    }
    if(currentCount.length === 0) { currentCount = "1"; }
    elemList.push([currentElem, currentCount]);

    for(var i=0; i<elemList.length; i++) {
      var atom = elemList[i][0];
      var count = parseInt(elemList[i][1]);
      if(!(atom in json)) {
        json[atom] = count;
      }
      else {
        json[atom] += count;
      }
    }
    return json;
  }

  isLowerCase(c) {
    return c === c.toLowerCase() && c !== c.toUpperCase();
  }

  isUpperCase(c) {
    return c === c.toUpperCase() && c!== c.toLowerCase();
  }

  isNumber(c) {
    return /^\d+$/.test(c);
  }

}