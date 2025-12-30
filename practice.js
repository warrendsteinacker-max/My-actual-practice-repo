const vehicle = {
  wheels: 4,
  engine: "v6"
};

const car1 = Object.create(vehicle);
const car2 = Object.create(vehicle);

car1.wheels = 2; // Shadowing
delete car1.wheels;

console.log(car1.wheels);
console.log(car2.wheels);