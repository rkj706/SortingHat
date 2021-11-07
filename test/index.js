var it = require('mocha-param');
// We have used chai as an assertion library but you can use any.
const {assert} = require('chai');
const index =  require('../index');
 
// A Simple sync example taking an array as a parameter.
// 'value' is each value in the array
describe("validate input", function () {
it('should throw an error if invalid roll Number is given', [1], () => {
      try {
        var result = index.validateInputs(['reg1', '123', 'B' , 'NV']);
        assert.equal(true, result)
      } catch(error) {        
        assert.isOk(error)
        assert.equal('Invalid roll number, Please user atleast 4 digit', error)
      }
});
it('should throw an error if invalid  input is given', [1], () => {
    try {
      var result = index.validateInputs(['reg1', '123' , 'NV']);
      assert.equal(true, result)
    } catch(error) {        
      assert.isOk(error)
      assert.equal('Invalid input length', error)
    }
});
it('should pass and return true if input is given', [1], () => {
  try {
    var result = index.validateInputs(['reg1', '1234', 'A' , 'NV']);
    assert.equal(true, result)
  } catch(error) {        
    assert.isNotOk(error)   
  }
});   
})
describe("test register student", function () {
    it('should not throw any error', [1], ()=> {
       try {
          var input = ['reg 1234 A V', 'reg 1235 A NV', 'reg 1236 B NV', 'reg 1237 B V']
          input.forEach((i)=> {
            index.registerStudent(i.split(' '));   
          })          
          var result = index.finish(); 
          const expected =  { AV: [ '1234' ],
          ANV: [ '1235' ],
          BNV: [ '1236' ],
          BV: [ '1237' ],
          NA: [] }
          assert.deepEqual(expected, result)
       } catch(error) {
         assert.isNotOk(error);
       }
    });
    it('should ignore duplicate roll number and not throw any error', [1], ()=> {
      try {
         var input = ['reg 1234 A V', 'reg 1234 B V', 'reg 1235 A NV', 'reg 1236 B NV', 'reg 1237 B V']
         input.forEach((i)=> {
           index.registerStudent(i.split(' '));   
         })          
         var result = index.finish(); 
         const expected =  { AV: [ '1234' ],
         ANV: [ '1235' ],
         BNV: [ '1236' ],
         BV: [ '1237' ],
         NA: [] }
         assert.deepEqual(expected, result)
      } catch(error) {
        assert.isNotOk(error);
      }
   });
})