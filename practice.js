function loginFlow() {
  console.log("1. Start Login");

  setTimeout(() => {
    console.log("4. Success");
  }, 0);

  Promise.resolve().then(() => {
    console.log("3. Database Call");
  });

  console.log("2. Logic Check");
}

loginFlow();
// Currently logs: 1, 4, 3, 2


///Goal: Fix the code so it logs the steps in the correct order for a user login flow:
//  Start -> Logic -> Database -> Success.