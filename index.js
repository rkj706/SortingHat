var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout

});
const rollNumberSize = 4;
const totalCapacity = 12;
let NA = [];
var foodClassMap = {AV:null, ANV: null, BV: null, BNV: null};
var boardingHouses = ["BH1", "BH2", "BH3", "BH4"];
const  foodPreferences = ['V', 'NV'];
var bordingHouseStudentMap = {BH1: {foodPreference: null ,students: [] } , BH2: {foodPreference: null ,students: [] }, BH3: {foodPreference: null ,students: [] }, BH4: {foodPreference: null ,students: [] }};
let registeredStudents = new Set();
let initialized = false;
const validateInputs = (inputArray) => {
  throw "Not implemented"
}

const registerStudent = (inputArray) => {
    try {
        if(validateInputs(inputArray)) {
          
        }          

} catch(error) {
    console.log(error);    
}
}

const finish = () => {
    let result = {}   
    return result;
}
rl.on('line', (input) => {
        const inputArray = input.split(' ');
        try {            
            if(initialized && inputArray[0] == 'fin') {
                finish();
            }   
            else if(initialized && inputArray[0] == 'reg') {
                registerStudent(inputArray);
            }
           else if(inputArray[0] == 'init') {
                initialized = true;
           } else {
               throw "Invalid command"
           }            
            
        } catch(error) {
            console.log(error);
            throw error;
        }
 });
 module.exports = {
    validateInputs,
    registerStudent,
    finish
 }