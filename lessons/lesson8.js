//Functions: Function is a block of code that performs a specific task. 

//Declarative function: A function that is defined using the function keyword and has a name. It can be called before it is defined in the code.
function helloOne(){
    console.log("Hello One");
}
helloOne(); //function call

//Anonymous function: A function without a name. It is often used as a callback function or assigned to a variable.
let helloTwo = function(){
    console.log("Hello Two");
}
helloTwo(); //function call

//ES6 syntax for anonymous function: Arrow function. It is a shorter syntax for writing anonymous functions.
let helloThree = () => {
    console.log("Hello Three");
}
helloThree(); //function call

//Function with parameters: A function that takes one or more parameters as input and performs a specific task using those parameters.
function printName(name, lastName){
    console.log(`${name} ${lastName}`);
}
printName("Manuel", "Paez"); //function call with arguments

//Function with return value: A function that returns a value after performing a specific task.
function multiplyByTwo(number){
    let result = number *2;
    return result;
}
let myresult = multiplyByTwo(20); //function call with argument and return value
console.log(myresult); // Output: 40

//Import function from another file
import {printAge} from '../helpers/printHelper.js';
printAge(34); //function call with argument and return value

//Import everything
import * as helper from '../helpers/printHelper.js';
helper.printAge(35); //function call with argument and return value