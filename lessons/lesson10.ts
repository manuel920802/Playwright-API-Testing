
/*Typescript is a superset of JavaScript that adds static typing to the language. 
It allows developers to catch errors at compile time and provides better tooling and code organization.*/

/*In TypeScript, you can declare variables with specific types. 
This helps catch errors early and improves code readability.*/
let customerFirstName: string = "Manuel";
let customerLastName: string = "Paez";
let customerAge: number = 34;

//In TypeScript, you can also define custom types using interfaces or type aliases.
type Customer = {
    firstName: string;
    lastName: string;
    active: boolean;
}

//Now we can create an object of type Customer using the defined type.
let firstCustomer: Customer = {
    firstName: "Manuel",
    lastName: "Paez",
    active: true,
}
