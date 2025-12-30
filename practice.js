var trainer = "Master Yoda";

function trainingSession() {
    var trainer = "Darth Vader";
  if (true) {
    console.log("Welcome, " + trainer); 
  }
}

trainingSession();
// Currently logs: "Welcome, undefined"

//Goal: Fix this code so that the console.log inside
//  the function correctly identifies the global trainer name.

//