var trainer = "Master Yoda";

function trainingSession() {
  console.log("Welcome, " + trainer); 
  
  if (true) {
    var trainer = "Darth Vader";
  }
}

trainingSession();
// Currently logs: "Welcome, undefined"

//Goal: Fix this code so that the console.log inside
//  the function correctly identifies the global trainer name.