/*Classes
Classes are blueprints for creating objects. 
They encapsulate data and functions that operate on that data. 
In JavaScript, classes were introduced in ES6 as syntactic sugar over the existing prototype-based inheritance.*/

import {customerDetails} from "../helpers/printHelper.js";

//Use the methods of the class to print customer details
customerDetails.printFirstName("Manuel");
customerDetails.printLastName("Paez");