'use strict';

var repl = require('repl');

/*create a private object literal for holding ALL matrices*/
var allMatrices = {};

class Matrices {
  constructor(matrix) {
    if(isValidMatrix(matrix)) {
      this.rows = [];
      matrix.forEach(function(row) { rows.push(row); });
      this.numberOfRows = matrix.length;
      this.numberOfColumns = matrix[0].length;
    }
    else{
      console.log('Error! Please enter a valid matrix.')
    }
  }
  
  add () {
    console.log('I am a method!');
  }
}

function isValidMatrix(matrixCandidate) {
  var hasValidity = true;
  /*case of when matrix has arrays of equal length as rows
  but one of them contains a non-numeric element
  */
  if(allSameTypeAndLength(matrixCandidate)) {
    if(!(containsOnlyNumbers(matrixCandidate))) {
      hasValidity = false;
    }
  }
  /*case of when the matrix has disproportionate rows*/
  else {
    hasValidity = false;
  }
  return hasValidity;
}

function allSameTypeAndLength(oneMatrix) {
  var firstElementType = typeof oneMatrix[0];
  var firstElementLength = oneMatrix[0].length;
  var hasSameTypeAndLength = true;
  oneMatrix.forEach(function(element) {
    if(typeof element !== firstElementType || oneMatrix[0].length !== firstElementLength ) {
      return false;
    }
  });
  return hasSameTypeAndLength;
}

function containsOnlyNumbers(someMatrix) {
  var numbersOnly = true;
  someMatrix.forEach(function(currentRow) {
    currentRow.forEach(function(currentElement) {
      if (typeof currentElement !== typeof 15) {
        return false;
      }
    });
  });
  
  return numbersOnly;
}


var runningRepl = repl.start('matlab_clone>> ');
