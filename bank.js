// Load the fs package to read and write
var fs = require("fs");

// Take two arguments action and value see below.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.

switch (action) {
  // notice switch statement begins above for each case
  case "total":
    total();
    // this first case will look for the toatal function below 
    break;

  case "deposit":
    deposit();
    break;

  case "withdraw":
    withdraw();
    break;

  case "lotto":
    lotto();
    break;
}

// If the "total" function is called line 16...
function total() {

  // We will read the existing bank file
  // utf8 is just some text file its reading 

  fs.readFile("bank.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
//trying to catch any erroes here from reading the file and looking at data
    }

    // Break down all the numbers inside note the comma to left to get rid of extra space 
    data = data.split(", ");
    var result = 0;
    //result to 0 want to take all the values in the bank .txt and add together

    // Loop through those numbers and add them together to get a sum.
    for (var i = 0; i < data.length; i++) {
      if (parseFloat(data[i])) {
      // below is an addition 
        result += parseFloat(data[i]);
      }
    }
//  result.toFixed(2)); means there are only two decimal place we are going to show 
    // We will then print the final balance rounded to two decimal places.
    console.log("You have a total of " + result.toFixed(2));
  });
}

// If the "Deposit" function is called...
function deposit() {

  // We will add the value to the bank file notice the appendFile means add to.
  fs.appendFile("bank.txt", ", " + value, function(err) {
    if (err) {
      return console.log(err);
    }
  });

  // We will then print the value that was added (but we wont print the total).
  console.log("Deposited " + value + ".");
}

// If the "Withdraw" function is called
function withdraw() {

  // We will add a negative value to the bank file. same as minus-ing remember 8th grade math :)

  fs.appendFile("bank.txt", ", -" + value, function(err) {
    if (err) {
      return console.log(err);
    }
  });

  // We will then print the value that was subtracted (but we wont print the total).
  console.log("Withdrew " + value + ".");
}


// If the "Lotto" function is called
function lotto() {

  // We will subtract 25 cents
  fs.appendFile("bank.txt", ", -.25", function(err) {
    if (err) {
      return console.log(err);
    }
  });

  // Then grab a random number
  var chance = Math.floor((Math.random() * 10) + 1);

  // If the random number equals 1...
  if (chance === 1) {

    // We will then add $2 to the account.
    fs.appendFile("bank.txt", ", 2", function(err) {
      if (err) {
        return console.log(err);
      }
    });

    // And tell the user the amount was added.
    console.log("Congrats you won the lottery!");

  // Otherwise we will tell them they lost 25 cents.
  }
  else {
    console.log("Sorry. You just lost 25 cents. Maybe you should get a job instead.");
  }
}
