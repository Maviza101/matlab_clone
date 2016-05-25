'use strict';
describe("A clone of Matlab's REPL.", function() {
  /*create a 2 x 3 matrix*/
  var matrix = new Matrices([1,2,3], [5,6,7]);
  
  it("createMatrix function should be implemented", function() {
    expect(createMatrix).toBeDefined();
  });
  
});