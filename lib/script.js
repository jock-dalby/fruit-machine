/*****************************************
 Declare variables
*****************************************/
var bet = 2;
var credit = 100;
var win = 0;
var nudges = 0;
var results = [];
var icons = [
  {fruit: "cheese", value: 2},
  {fruit: "cherries", value: 4},
  {fruit: "grapes", value: 6},
  {fruit: "watermelon", value: 8},
  {fruit: "slots-bell", value: 10}
]
var stopAction = false;


/*****************************************
 Declare displays, reels & buttons
*****************************************/
var displays = document.getElementsByClassName("display-this");;
// display[0] = Nudge Display
// display[1] = Bet Display
// display[2] = Credit Display
// display[3] = Win Display
var reels = document.getElementsByClassName("reel");
var buttons = document.getElementsByClassName("button");
displays[3].innerText = "Come and Abba go!";
/*****************************************
 Add Event Listeners to Buttons
*****************************************/
for (var i = buttons.length - 1; i >= 0; i--) {
  var el = buttons[i];
  el.addEventListener('click', function(e){
    var currentButton = e.path[1];
    // Check if button press is a nudge button.
    if(currentButton.dataset.type === "nudge") {
      // If it is, execute the nudge function.
      nudge (currentButton);
      return;
    }
    // Check no nudges remaining before allowing to changeBet or Spin
    checkNudgeCount();
    if (stopAction) {
      return;
    }
    // Check if button press is to change bet value.
    if(currentButton.dataset.type === "changeBet") {
      changeBet(currentButton.dataset.method);
    }
    // Check if button press is to spin 'em reels!'
    if(currentButton.dataset.type === "spin") {
      // Reset the win count to zero
      win = 0;
      // Check enough available credit to play.
      if((credit - bet) <= -1) {
        return;
      }
      spin();
      checkWin();
      updateFunds();
      if (win === 0) {
        randomNudges();
      }
    }
  })
}

// Check no nudges remaining before allowing to changeBet or Spin
function checkNudgeCount() {
  if(nudges > 0) {
    if (nudges === 1) {
      displays[3].innerText = "You STILL have 1 nudge!!";
    } else {
      displays[3].innerText = "You STILL have " + nudges + " nudges!!";
    }
    displays[3].style.background = "pink";
    stopAction = true;
    return;
  } else {
    stopAction = false;
  }
}

// Evaluate if the player wants to increase or decrease the bet and act accordingly
function changeBet(command) {
  if (bet <= 9 && command === "increaseBet") {
    bet = bet + 1;
  }
  if (bet >= 1 && command === "decreaseBet") {
    bet = bet - 1;
  }
  displays[1].innerText = bet;
}

// Spin those reels! Create a 9 value long results array.
function spin () {
  reset ();
  for (var j = reels.length - 1; j >= 0; j--) {
    var x = Math.floor(Math.random() * icons.length);
    results.unshift(icons[x]);
  }
  updateReels();
}

// At the start of each spin reset the results array back to empty and clear screens.
function reset () {
  displays[3].style.background = "white";
  displays[3].innerText = "";
  results = [];
}

// Use the updated results array to update the fruits on the reels
function updateReels() {
  for (var x = 0; x < results.length; x++) {
    reels[x].style.backgroundImage = "url('img/" + results[x].fruit + ".png')";
  }
}

// Check the reels to see if there are 3 in a row on any line.
function checkWin () {
  if (results[0].fruit === results[1].fruit && results[1].fruit === results[2].fruit) {
    win = win + (results[0].value * bet);
  }
  if (results[3].fruit === results[4].fruit && results[4].fruit === results[5].fruit) {
    win = win + (results[3].value * bet);
  }
  if (results[6].fruit === results[7].fruit && results[7].fruit === results[8].fruit) {
    win = win + (results[6].value * bet);
  }
  if (win > 0) {
    displayWin ()
    return;
  }
  displayNudges ();
}

// If there is a win, reset nudges to 0 and update all screens
function displayWin () {
  nudges = 0;
  displays[0].innerText = nudges;
  displays[3].style.background = "gold";
  displays[3].innerText = "WINNER! You won " + win + " credits!!";
}

// Use a random number element to decide if the player gets any nudges and how many.
function randomNudges () {
  var temp = Math.random();
  if (temp <= 0.6) {
    return;
  }
  if (temp > 0.6 && temp <= 0.85) {
    nudges = 1;
  }
  if (temp > 0.85 && temp <= 0.9) {
    nudges = 2;
  }
  if (temp > 0.9 && temp <= 1) {
    nudges = 3;
  }
  displayNudges ()
  return;
}

// Each time the player uses a nudge, adjust the results array and then update the reels  and check for a win.
function nudge(command) {
  if (nudges <= 0) {
    displays[0].innerText = "0";
    return;
  }
  displays[3].style.background = "white";
  nudges = nudges - 1;
  var newItem = icons[Math.floor(Math.random() * icons.length)];
  if(command.dataset.method === "left") {
    results.copyWithin(6, 3, 4);
    results.copyWithin(3, 0, 1);
    results.shift(0);
    results.unshift(newItem);
  }
  if(command.dataset.method === "middle") {
    results.copyWithin(7, 4, 5);
    results.copyWithin(4, 1, 2);
    var holdItem = results[0];
    results.shift(0);
    results.shift(0);
    results.unshift(newItem);
    results.unshift(holdItem);
  }
  if(command.dataset.method === "right") {
    results.copyWithin(8, 5, 6);
    results.copyWithin(5, 2, 3);
    var holdItem = results[0];
    var holdItem2 = results[1];
    results.shift(0);
    results.shift(0);
    results.shift(0);
    results.unshift(newItem);
    results.unshift(holdItem2);
    results.unshift(holdItem);
  }
  updateReels();
  checkWin ();
}

// Update nudge displays
function displayNudges () {
  if (nudges === 0) {
    displays[3].style.background = "white";
    displays[3].innerText = "";
  } else if (nudges === 1){
    displays[3].innerText = "You have " + nudges + " nudge!!";
  } else {
    displays[3].innerText = "You have " + nudges + " nudges!!";
  }
  displays[0].innerText = nudges;
}

// At the end of each completed turn, update players credit by taking off the bet amount and adding the win amount.
function updateFunds() {
  credit = credit - bet + win;
  displays[2].innerText = credit;
}
