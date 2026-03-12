//Hello world
console.log("Hello world");

//Variables
var firstName = "Manuel"; //var is a global variable, it can be accessed anywhere in the code
let lastName = "Paez"; //let is a block scope variable, it can only be accessed within the block it was declared in
console.log(`${firstName} ${lastName}`);

let age, dateOfBirth, sex
age = 34;
dateOfBirth = "1992, 08, 02";
sex = "Male";
console.log(`${firstName} ${lastName}, Age: ${age}, Date of Birth: ${dateOfBirth}, Sex: ${sex}`);

//constants
const occupation = "Quality Assurance Engineer";
console.log(`Occupation: ${occupation}`);

//Data types
let middleName = "Andres"; //String
let ageInYears = 34; //Number
let isMarried = false; //Boolean
let yearsOfMarriage = null; //Null
let numberOfChildren; //Undefined