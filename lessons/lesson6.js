//Conditional statement

/* if(condition){
    //code to be executed if condition is true
}else{
    //code to be executed if condition is false
} */

//If hour between 6 and 12: "Good morning"
//If hour between 12 and 18: "Good afternoon"
//Otherwise: "Good evening"

let hour = 17;

if(hour >= 6 && hour < 12){
    console.log("Good Morning");
} else if(hour >= 12 && hour < 18){
    console.log("Good Afternoon");
}else{
    console.log("Good Evening");
}

let ageIsMoreThan18 = false;
let isUsCitizen = true;

if(ageIsMoreThan18 && isUsCitizen){
    console.log("You are eligible to vote");
}else{
    console.log("You are not eligible to vote");
}