var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout

});
const rollNumberSize = 4;
const totalCapacity = 12; // Assume total capacity is 12
let NA = [];
var foodClassMap = {AV:null, ANV: null, BV: null, BNV: null};
var boardingHouses = ["BH1", "BH2", "BH3", "BH4"];
const  foodPreferences = ['V', 'NV'];
var bordingHouseStudentMap = {BH1: {foodPreference: null ,students: [] } , BH2: {foodPreference: null ,students: [] }, BH3: {foodPreference: null ,students: [] }, BH4: {foodPreference: null ,students: [] }};
let registeredStudents = new Set();
let initialized = false; 
const validateInputs = (inputArray) => {
    if(inputArray.length!==4) throw 'Invalid input length';
    if(Math.floor(inputArray[1]).toString().length!=rollNumberSize) throw 'Invalid roll number, Please user atleast 4 digit';
    else if(registeredStudents.has(inputArray[1])) return false;
    if(!foodPreferences.includes(inputArray[3])) throw 'Invalid food preference';
    else return true;
}

const registerStudent = (inputArray) => {
    try {
        if(validateInputs(inputArray)) {
            let fp = inputArray[2].concat(inputArray[3]);
            if(!foodClassMap[fp]) {
                let boardingHouse = boardingHouses.shift();
                foodClassMap[fp] = boardingHouse;
                bordingHouseStudentMap[boardingHouse]['students'].push(inputArray[1])
                bordingHouseStudentMap[boardingHouse]['foodPreference'] = fp;
                registeredStudents.add(inputArray[1]);
            } else {
                // Boarding house can not register students more than the total total capacity devided by number of boarding house
                if(bordingHouseStudentMap[foodClassMap[fp]]['students'].length < Math.floor(totalCapacity / 4)) {
                  bordingHouseStudentMap[foodClassMap[fp]]['students'].push(inputArray[1]);
                  registeredStudents.add(inputArray[1]);
                } else {
                  NA.push(inputArray[1]);
                }
            }
        }          

} catch(error) {
    console.log(error);    
}
}

const finish = () => {
    let result = {}
    Object.keys(bordingHouseStudentMap).forEach((k)=>{
         result[bordingHouseStudentMap[k]['foodPreference']] = bordingHouseStudentMap[k]['students'];
    })
    result['NA'] = NA;
    console.log(result);
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