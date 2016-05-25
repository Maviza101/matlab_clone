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
    var userinput = line.split(' ');
    runCommand(userinput);
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
    if(dimensionOf(this) ==== dimensionOf(otherMatrix)) {
      
    }
  }
}
function runCommand(commandAndArguments) {
  /*
  commandAndArguments is an array, the first element of which must be the specific command, while
  the other elements are the arguments.
  */
  var specificCommand = commandAndArguments[0];
  specificCommand = specificCommand.toLowerCase();
  switch (specificCommand) {
    case 'create':
      createMatrix();
      break;
      
    case 'add':
      try { 
        /*get the name of the Matrices instance to which we want to add the other array(s), then
        use its add method to add the other array(s). If no array with the specified name has been
        created, throw an error.*/
        var recipientMatrix = allMatrices[commandAndArguments[1]];
        recipientMatrix.add(commandAndArguments[2]); 
      }
      catch (error) {
        console.log(error.name + ': ' + error.message);
        }
      break;
      
    case 'help':
      help(commandAndArguments[2]);
      
    case 'quit':
      break;
      
    
    default: 
      console.log('Invalid command. Please try again.');
  }
}

function createMatrix() {
  console.log('I exist!');
}

function help() {
  console.log()
}


let m = new Matrices([1,2], [4,5]);