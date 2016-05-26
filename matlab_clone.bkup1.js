'use strict';
/*
read the command supplied by the user all on a SINGLE line
*/
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
    /*read the command, name of matrix to be modified and other arguments.*/
    var firstThreeArguments = line.split(' ', 3);
    var indexThirdArgument = line.indexOf(firstThreeArguments[2]);
    var remainingArguments = line.slice(indexThirdArgument);
    var command = firstThreeArguments[0];
    var targetMatrix = firstThreeArguments[1];
    runCommand(command, targetMatrix, remainingArguments);
})

/*create a private object literal for holding ALL matrices*/
var allMatrices = {};

class Matrices {
  constructor() {
    /*
    arguments is an iterable object that contains ALL the parameters that
    were given to an instance of Matrices as arguments. This is sort of an
    implementation of overloaded methods.
    */
    var allArguments = Array.from(arguments);
    var matrix = [];
    allArguments.forEach(function(element) { matrix.push(element); });
    console.log('You have created an array as follows:');
    matrix.forEach(function(element) { console.log(element.toString()); });
  }
  
  add (otherMatrix) {
    if(dimensionOf(this) === dimensionOf(otherMatrix)) {
      
    }
  }
}
function runCommand(aCommand, nameOfMatrix, otherArgugments) {
  aCommand = aCommand.toLowerCase();
  console.log(aCommand);
  console.log(nameOfMatrix);
  console.log(otherArgugments);
  console.log(typeof otherArgugments);
  console.log(otherArgugments[0]);
  console.log(otherArgugments[1]);
  console.log(typeof otherArgugments[0]);
  console.log(typeof otherArgugments[1]);
  switch (aCommand) {
    case 'create':
      /*note that parseMatrix doesn't check that the rows have
      the number of columns or all their elements are numbers. It's
      createMatrix that does that.*/
      var matrixElements = parseMatrix(otherArgugments);
      createMatrix(nameOfMatrix, matrixElements);
      break;
      
    case 'add':
      try { 
        /*get the name of the Matrices instance to which we want to add the other array(s), then
        use its add method to add the other array(s). If no array with the specified name has been
        created, throw an error.
        */
        console.log(allMatrices[nameOfMatrix]);
        var recipientMatrix = allMatrices[nameOfMatrix];
        recipientMatrix.add(otherArgugments); 
      }
      catch (error) {
        console.log(error.name + ': ' + error.message);
        }
      break;
      
    case 'help':
      help(nameOfMatrix);
      
    case 'quit':
      break;
      
    default: 
      console.log('Invalid command. Please try again.');
  }
}

function createMatrix(matrixName, matrixContent) {
  if(isValidMatrix(matrixContent)) {
    allMatrices[matrixName] = new Matrices (matrixContent);
  }
}

function help() {
  console.log();
}

/*helper or client functions*/
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

function parseMatrix(toBeParsed) {
  var temp = toBeParsed.split(']');
  temp = temp.slice(0, (temp.length - 2));
  var final = [];
  temp.forEach(function(row) { 
      final.push(row.replace(/.*\[/, ''));
  });
  var final2 = [];
  var t = [];
  final.forEach(function(rowStr, rowOfElement) { 
    t = rowStr.split(',');
    t.forEach(function(columnStr, columnOfElement) {
      t[columnOfElement] = parseInt(columnStr);
    });
    final2.push(t);
  });
  return final2;
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
      if (typeof currentElement !== typeof 16) {
        return false;
      }
    });
  });
  
  return numbersOnly;
}
