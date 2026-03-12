//Objects

var customer = {
    firstName: 'Manuel',
    lastName: 'Paez',
    age: 34,
    dateOfBirth: '1992, 08, 02',
    cars: ["Volvo", "Toyota", "Deepal"]
};
customer.firstName = 'Andres'; //Updating the value of a property


console.log(customer); //Prints the whole object
console.log(`${customer.firstName}`); //Dot notation, it is the most common way to access the properties of an object, it is more readable and easier to use
console.log(`${customer['lastName']}`); //Bracket notation, it is used when the property name is stored in a variable or when the property name is not a valid identifier (e.g. contains spaces or special characters)

//Arrays
var cars = ["Volvo", "Toyota", "Deepal"];
cars[1] = "Honda"; //Updating the value of an element in the array
console.log(cars[0]); //Accessing the first element of the array
console.log(customer.cars[2]); //Accessing the third element of the cars array in the customer object
