//Loops

//For loop (Initialization; Condition; Increment/Decrement)
for(let i=0; i<5; i++){
    console.log("Hello world");
}

//for each loop (iterating over iterable objects like arrays, strings, etc.)
let cars = ["BMW", "Audi", "Mercedes"];
for(let car of cars){
    console.log(car)
    if (car == "Audi"){
        break; //exit the loop
    }
}

//ES6 syntax for each loop
cars.forEach(car =>{
    console.log(car);
})

