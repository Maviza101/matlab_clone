'use strict';
var jsonfile = require('jsonfile');
jsonfile.spaces = 2;

/*
read the command supplied by the user all on a SINGLE line
*/
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('\nmatlab_clone> ');
rl.prompt(true);
rl.on('line', function(line){
    /*read the command, name of matrix to be modified and other arguments.*/
    var firstThreeArguments = line.split(' ', 3);
    var indexThirdArgument = line.indexOf(firstThreeArguments[2]);
    var remainingArguments = line.slice(indexThirdArgument);
    var command = firstThreeArguments[0];
    var targetMatrix = firstThreeArguments[1];
    runCommand(command, targetMatrix, remainingArguments);
    rl.prompt(true);
})

/*create a private object literal for holding ALL matrices*/
var allMatrices = {};

class Matrices {
  constructor(newMatrix) {
    var rows = [];
    newMatrix.forEach( function(row) {
      rows.push(row);
    });
    this.rows = rows;
    this.numberOfRows = this.rows.length;
    this.numberOfColumns = this.rows[0].length;
    this.dimensions = [this.numberOfRows, this.numberOfColumns]
  }
  
  toString() {
    return this.rows;
  }
  
  add(otherMatrix) {
    var tempMatrix = [[]];
    if((this.numberOfRows === otherMatrix.numberOfRows) && (this.numberOfColumns === otherMatrix.numberOfColumns)) {
      var i = 0,
          j = 0,
          temp = [];
      this.rows.forEach(currentRow => {
        temp = [];
        j = 0;
        currentRow.forEach(currentColumn => {
          temp.push(this.rows[i][j] + otherMatrix.rows[i][j]);
          j++;
        });
        i++;
        tempMatrix.push(temp);
      });
    }
    /*for some reason, the first element of tempMatrix from above 
    is an empty string*/
    tempMatrix = tempMatrix.splice(1);
    return tempMatrix;
  }
  
  subtract(otherMatrix) {
    var tempMatrix = [[]];
    if((this.dimensions[0] == otherMatrix.dimensions[0]) && (this.dimensions[1] == otherMatrix.dimensions[1])) {
      var i = 0,
          j = 0,
          temp = [];
      this.rows.forEach(currentRow => {
        temp = [];
        j = 0;
        currentRow.forEach(currentColumn => {
          temp.push(this.rows[i][j] - otherMatrix.rows[i][j]);
          j++;
        });
        i++;
        tempMatrix.push(temp);
      });
    }
    /*for some reason, the first element of tempMatrix from above 
    is an empty string*/
    tempMatrix = tempMatrix.splice(1);
    return tempMatrix;
  }
  
  concat(otherMatrix) {
    if(this.numberOfColumns === otherMatrix.numberOfColumns) {
      otherMatrix.rows.forEach(row => this.rows.push(row));
      return this.rows;
    }
    else {
      return 'Error! Matrices to be concatenated must have the same number of columns.';
    }
  }
}
function runCommand(aCommand, nameOfMatrix, otherArgugments) {
  aCommand = aCommand.toLowerCase();
  switch (aCommand) {
    case 'create':
      try {
      var matrixElements = parseMatrix(otherArgugments);
      createMatrix(nameOfMatrix, matrixElements);
      }
      catch (error) {
        console.log(error.name + ': ' + error.message);
        }
      break;
      
    case 'add':
      try {
        var recipientMatrix = allMatrices[nameOfMatrix];
        var incomingMatrix = allMatrices[otherArgugments];
        recipientMatrix = recipientMatrix.add(incomingMatrix);
        console.log(recipientMatrix);
      }
      catch (error) {
        console.log(error.name + ': ' + error.message);
        }
      break;
      
    case 'subtract':
    try {
      var recipientMatrix = allMatrices[nameOfMatrix];
      var incomingMatrix = allMatrices[otherArgugments];
      recipientMatrix = recipientMatrix.subtract(incomingMatrix);
      console.log(recipientMatrix);
    }
    catch (error) {
      console.log(error.name + ': ' + error.message);
      }
    break;
      
    case 'concat':
      try {
        var toMatrix = allMatrices[nameOfMatrix];
        var thisMatrix = allMatrices[otherArgugments];
        toMatrix.concat(thisMatrix);
      }
      catch(error) {
        console.log(error.name + ': ' + error.message);
      }
      break;
      
    case 'show':
      try {
        var stringForm = allMatrices[nameOfMatrix].toString();
        console.log(stringForm);
      }
      catch(error) {
        console.log(error.name + ': ' + error.message);
      }
      break;
      
    case 'save':
      try {
        if(nameOfMatrix === '>>') {
        saveSession(allMatrices, otherArgugments);
        }
      }
      catch(error) {
        console.log(error.name + ': ' + error.message);
      }
      break;
      
    case 'load':
      try {
        /*for semantics*/
        var filePath = nameOfMatrix;
        loadSession(filePath);
      }
      catch(error) {
        console.log(error.name + ': ' + error.message);
      }
      break;
      
      
    case 'help':
      try {
        /*for semantics*/
        var option = nameOfMatrix;
        console.log(help(option));
      }
      catch(error) {
        console.log(error.name + ': ' + error.message);
      }
      break;
      
    case 'quit':
      process.exit(0);
      /* just a precaution... */
      break;
      
    default: 
      console.log('Invalid command. Please try again. Type \'help [command]\' to read more about how to use this software.');
  }
}

function createMatrix(matrixName, matrixContent) {
  if(isValidMatrix(matrixContent)) {
    allMatrices[matrixName] = new Matrices(matrixContent);
    return allMatrices[matrixName].rows;
  }
  else {
    return('Failed to create matrix. Type \'help [command]\' to read more about how to use this software.');
  }
}

function saveSession(someObject, somePath) {
  jsonfile.writeFile(somePath, someObject, err => { if(err !== null) return err; });
}

function loadSession(filePath) {
  var someObj = jsonfile.readFileSync(filePath);
  for(var key in someObj) {
    allMatrices[key] = new Matrices(someObj[key].rows);  
  }
  console.log('Successfully loaded session in: ' + filePath);
}

function help(forCommand) {
  switch(forCommand) {
    case 'create':
      return 'Syntax: \n  \
              create MATRIX_NAME CONTENTS_OF_MATRIX\n  \
              Note that CONTENTS_OF_MATRIX must be of the form [array1, array2, array3]. \n\
              EXAMPLES: \n\
              create matrix1 [[1,2,3],[4,5,6]] \n\
              create matrix2 [[1],[2],[3],[4]]';
      break;
      
    case 'add':
      return 'Syntax: \n  \
              add RECIPIENT_MATRIX MATRIX_TO_ADD\n  \
              Used when you want to add the elements of MATRIX_TO_ADD to RECIPIENT_MATRIX. Note that \n\
              the two matrices MUST be of the same dimensions(or the program will error out). Note also \n\
              that elements of RECIPIENT_MATRIX will be assigned the result from each sum. \n\
              EXAMPLE: \n\
              add matrix1 matrix2';
      break;
      
    case 'subtract':
      return 'Syntax: \n  \
              subtract RECIPIENT_MATRIX MATRIX_TO_SUBTRACT\n  \
              Used when you want to subtract the elements of MATRIX_TO_ADD from RECIPIENT_MATRIX. Note that \n\
              the two matrices MUST be of the same dimensions(or the program will error out). Note also \n\
              that elements of RECIPIENT_MATRIX will be assigned the result from each difference. \n\
              EXAMPLE: \n\
              subtract matrix1 matrix2';
      break;
      
    default:
      var manual = 'Available commands: \n  \
                    create, add, subtract, concat, show, save, load, quit.\n  \
                    Type \'help COMMAND\' for more info about a specific command.\n  \
                    Note that you can only use a single space between the commands/arguments you give.\n  \
                    Note that matrices can ONLY contain numbers.';
      return manual;  
  }
}

/*helper or client functions*/
function isValidMatrix(matrixCandidate) {
  var hasValidity = (allSameTypeLength(matrixCandidate) && containsOnlyNumbers(matrixCandidate));
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

function allSameTypeLength(oneMatrix) {
  var firstElementType = typeof oneMatrix[0];
  var firstElementLength = oneMatrix[0].length;
  var hasSameTypeAndLength = oneMatrix.every(row => (typeof row === firstElementType && row.length === firstElementLength));
  return hasSameTypeAndLength;
}

function containsOnlyNumbers(someMatrix) {
  /*var hasNumbersOnly = someMatrix.every(row => {row.every(element => isNaN(element) ) });*/
  var hasNumbersOnly = true;
  for(var i = 0; i < someMatrix.length; i++) {
    for(var j = 0; j < someMatrix[i].length; j++) {
      if(isNaN(someMatrix[i][j])) {
        hasNumbersOnly = false;
        break;
      }
    }
    if(hasNumbersOnly !== true) {
      break;
    }
  }
  return hasNumbersOnly;
}

//load juy.txt
