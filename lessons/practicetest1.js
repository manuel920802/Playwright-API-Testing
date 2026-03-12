let familySize = 4;
let plannedDistanceToDrive = 200;

function recommendedCar(familySize, plannedDistanceToDrive) {
    if (familySize <= 4 && plannedDistanceToDrive < 200 ){
        return("Tesla")
    }else if (familySize <= 4 && plannedDistanceToDrive >= 200){
        return("Toyota Camry")
    }else if (familySize > 4 ){
        return("Minivan")
    }

}

console.log(recommendedCar(familySize, plannedDistanceToDrive));