//var source = require('../../matlab_clone.js');
describe("A clone of Matlab's REPL.", function() {
  /*create a 2 x 3 matrix*/
  /*matrix = new Matrices([[1,2,3], [5,6,7]]);*/
  
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
  
  document.write('\n\n');
  
  it("isValidMatrix([[2,3,4], [9,8,7]]) should return true", function() {
    expect(isValidMatrix([[2,3,4], [9,8,7]])).toBe(true);
  });
  
  it("isValidMatrix([ [2, 3,4], [9, 8,7]]) should return true", function() {
    expect(isValidMatrix([ [2, 3,4], [9, 8,7]])).toBe(true);
  });
  
  it("isValidMatrix([   [   2,   3,  4], [     9, 8,   7]]) should return true", function() {
    expect(isValidMatrix([   [   2,   3,  4], [     9, 8,   7]])).toBe(true);
  });
  
  it("isValidMatrix([[2], [2]]) should return true", function() {
    expect(isValidMatrix([[2], [2]])).toBe(true);
  });
  
  it("isValidMatrix([[], []]) should return true", function() {
    expect(isValidMatrix([[], []])).toBe(true);
  });
  
  
  it("isValidMatrix([[2,3,4], [9,8,]]) should return false", function() {
    expect(isValidMatrix([[2,3,4], [9,8,]])).toBe(false);
  });
  
  it("isValidMatrix([[2,3,4], [9,8]]) should return false", function() {
    expect(isValidMatrix([[2,3,4], [9,8]])).toBe(false);
  });
  
  it("isValidMatrix([[2,3,4], []]) should return false", function() {
    expect(isValidMatrix([[2,3,4], []])).toBe(false);
  });
  
  it("isValidMatrix([[2,3,4], [9,\'h\',7]]) should return false", function() {
    expect(isValidMatrix([[2,3,4], [9,'h',7]])).toBe(false);
  });
  
  it("parseMatrix(\'[[2,3,4], [9,\'h\',7]]\') should return [[2,3,4], [9,\'h\',7]]", function() {
    expect(parseMatrix('[[2,3,4], [9,\'h\',7]]').join(' ')).toBe([[2,3,4], [9,NaN,7]].join(' '));
  });
  
  it("parseMatrix(\'[[2,3,4], [9,7]]\') should return [[2,3,4], [9,7]]", function() {
    expect(parseMatrix('[[2,3,4], [9,7]]').join(' ')).toBe([[2,3,4], [9,7]].join(' '));
  });
  
  it("parseMatrix(\'[[2,3,4], [9,4,7]]\') should return [[2,3,4], [9,4,7]]", function() {
    expect(parseMatrix('[[2,3,4], [9,4,7]]').join(' ')).toBe([[2,3,4], [9,4,7]].join(' '));
  });
});