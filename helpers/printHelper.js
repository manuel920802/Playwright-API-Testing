// Print helper functions

export function printAge(age){
    console.log(`Your age is: ${age}`);
}

//Declare a class to print customer details
class CustomerDetails {
    /**
     * This method prints the first name of the customer
     * @param {string} firstName 
     */
    printFirstName(firstName){
        console.log(`First Name: ${firstName}`);
    }

    printLastName(lastName){
        console.log(`Last Name: ${lastName}`);
    }

}

//Export the class to be used in other modules
export const customerDetails = new CustomerDetails();