'use strict';

var repl = require('repl');

var runningRepl = repl.start('matlab_clone>>');

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
  
  add () {
    console.log('I am a method!');
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
      var remaininigArguments = commandAndArguments.slice(2);
      allMatrices[commandAndArguments[1]] = math.matrix(remaininigArguments);
      console.log(allMatrices[commandAndArguments[1]]);
      console.log(allMatrices);
      break;
      
    case 'add':
      try { 
        /*get the name of the Matrices instance to which we want to add the other array(s), then
        use its add method to add the other array(s). If no array with the specified name has been
        created, throw an error.*/
        var incomingMatrix = allMatrices[commandAndArguments[1]];
        var recipientMatrix = allMatrices[commandAndArguments[2]];
        allMatrices[commandAndArguments[2]] = math.add(incomingMatrix, 4);
        console.log(incomingMatrix);
        console.log(recipientMatrix);
      }
      catch (error) {
        console.log(error.name + ': ' + error.message);
        }
      break;
      
    case 'help':
      help();
      
    case 'quit':
      break;
      
    
    default: 
      console.log('\nInvalid command. Please try again.\n');
  }
}

function createMatrix() {
  console.log('I exist!');
}

function help() {
  console.log('RTM');
}


let m = new Matrices([1,2], [4,5]);