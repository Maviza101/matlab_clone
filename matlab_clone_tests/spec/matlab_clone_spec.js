//var source = require('../../matlab_clone.js');
describe("A clone of Matlab's REPL.", function() {
  /*create a 2 x 3 matrix*/
  matrix = new Matrices([[1,2,3], [5,6,7]]);
  
  it("runCommand() should be defined", function() {
    expect(runCommand).toBeDefined();
  });
  
  it("createMatrix() should be defined", function() {
    expect(createMatrix).toBeDefined();
  });
  
  it("saveSession() should be defined", function() {
    expect(saveSession).toBeDefined();
  });
  
  it("loadSession() should be defined", function() {
    expect(loadSession).toBeDefined();
  });
  
  it("help() should be defined", function() {
    expect(help).toBeDefined();
  });
  
  it("isValidMatrix() should be defined", function() {
    expect(isValidMatrix).toBeDefined();
  });
  
  it("parseMatrix() should be defined", function() {
    expect(parseMatrix).toBeDefined();
  });
  
  it("allSameTypeLength() should be defined", function() {
    expect(allSameTypeLength).toBeDefined();
  });
  
  it("containsOnlyNumbers() should be defined", function() {
    expect(containsOnlyNumbers).toBeDefined();
  });
  
  it("runCommand() should be defined", function() {
    expect(runCommand).toBeDefined();
  });
  
});