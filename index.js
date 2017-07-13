var isoAbund = require('isotope-abundances');

module.exports = class MolecularFormula {
  constructor(mf) {
    this.formula = mf;
    var expanded = this.cleanParantheses(this.formula);
    this.composition = this.formulaToJson(expanded);
    this.simplifiedFormula = this.createSimplifiedFormula();
  }

  getFormula() {
    return this.formula;
  }

  getComposition() {
    return this.composition;
  }

  getSimplifiedFormula() {
    return this.simplifiedFormula;
  }

  createSimplifiedFormula() {
    var formula = "";
    for(var key in this.composition) {
      if(this.composition.hasOwnProperty(key)) {
        formula += key;
        if(this.composition[key] !== 1) { formula += this.composition[key]; }
      }
    }
    return formula;
  }

  createComposition(elemList) {
    var json = {}
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

  createElemList(formula) {
    var l = formula.split("");
    var currentElem = "";
    var currentCount = "";
    var elemList = [];

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
    return elemList;    
  }

  getParanthesisGroups(formula) {
    var openIndex = [];
    var groups = [];

    for(var i=0; i<formula.length; i++) {
      var c = formula[i];
      if(c === "(") {
        openIndex.push(i);
      }
      if(c === ")") {
        groups.push([openIndex.pop(), i]);
      }
    }
    return groups;
  }

  cleanParantheses(formula) {
    if(!formula.includes("(")) { return formula; }
    else {
      var innerGroup = this.getParanthesisGroups(formula)[0];
      var startIndex = innerGroup[0];
      var stopIndex = innerGroup[1]

      var c = "";
      var i = 1;
      while(this.isNumber(formula[stopIndex+i])) {
        c += formula[stopIndex+i];
        i++;
      }
      if(c.length === 0) { c = "1"; }
      var multiplier = parseInt(c);
      var partial = formula.substring(startIndex+1, stopIndex);

      var elemList = this.createElemList(partial);
      var newPartial = "";
      for(var i=0; i<elemList.length; i++) {
        newPartial += elemList[i][0];
        newPartial += elemList[i][1] * multiplier;
      }

      var replacePart = "(" + partial + ")";
      if(multiplier !== 1) { replacePart += multiplier; }
      var newFormula = formula.replace(replacePart, newPartial);
      return this.cleanParantheses(newFormula);
    }
  }

  formulaToJson(formula) {
    var elemList = this.createElemList(formula);
    return this.createComposition(elemList);
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