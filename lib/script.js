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


/*****************************************
 Declare displays, reels & buttons
*****************************************/
var displays = document.getElementsByClassName("display-this");;
// display[0] = Nudge Display
// display[1] = Bet Display
// display[2] = Credit Display
// display[3] = Win Display
console.log(displays);
var reels = document.getElementsByClassName("reel");
var buttons = document.getElementsByClassName("button");

/*****************************************
 Add Event Listeners to Buttons
*****************************************/
for (var i = buttons.length - 1; i >= 0; i--) {
  var el = buttons[i];
  el.addEventListener('click', function(e){
    var currentButton = e.path[1];
    if(currentButton.dataset.type === "nudge") {
      nudge (currentButton);
    }
    if(nudges > 0) {
      alert("You have not used all of your nudges!");
      return;
    }
    if(currentButton.dataset.type === "changeBet") {
      changeBet(currentButton.dataset.method);
    }
    if(currentButton.dataset.type === "spin") {
      win = 0;
      if((credit - bet) <= -1) {
        return;
      }
      spin();
      checkWin();
      manageFunds();
      if (win === 0) {
        checkNudges();
      }
    }
  })
}

// Spin function
function manageFunds() {
  credit = credit - bet + win;
  displays[2].innerText = credit;
}

function changeBet(command) {
  if (bet <= 9 && command === "increaseBet") {
    bet = bet + 1;
  }
  if (bet >= 1 && command === "decreaseBet") {
    bet = bet - 1;
  }
  displays[1].innerText = bet;
}

function spin () {
  reset ();
  for (var j = reels.length - 1; j >= 0; j--) {
    var x = Math.floor(Math.random() * icons.length);
    reels[j].style.backgroundImage = "url('img/" + icons[x].fruit + ".png')";
    results.unshift(icons[x]);
  }
}

function checkWin () {
  if (results[0].fruit === results[1].fruit && results[1].fruit === results[2].fruit) {
    win = win + (results[0].value * bet);
    displayWin ()
  }
  if (results[3].fruit === results[4].fruit && results[4].fruit === results[5].fruit) {
    win = win + (results[3].value * bet);
    displayWin ()
  }
  if (results[6].fruit === results[7].fruit && results[7].fruit === results[8].fruit) {
    win = win + (results[6].value * bet);
    displayWin ()
  }
}

function displayWin () {
  nudges = 0;
  displays[0].innerText = nudges;
  displays[3].style.background = "gold";
  displays[3].innerText = "WINNER! You won " + win + " credits!!";
}

function displayNudges () {
  displays[0].innerText = nudges;
  displays[3].innerText = "You have " + nudges + " nudges!!";
}

function reset () {
  displays[3].style.background = "white";
  displays[3].innerText = "";
  results = [];
}

function checkNudges () {
  var temp = Math.random();
  if (temp <= 0.6) {
    return;
  }
  if (temp <= 0.85) {
    nudges = 1;
    displayNudges ()
    return;
  }
  if (temp <= 0.9) {
    nudges = 2;
    displayNudges ()
    return;
  }
  if (temp <= 1) {
    nudges = 3;
    displayNudges ()
    return;
  }
}


function nudge(command) {
  if (nudges <= 0) {
    displays[0].innerText = "0";
    return;
  }
  nudges = nudges -1;
  if(command.dataset.method === "left") {
    results.copyWithin(6, 3, 4);
    results.copyWithin(3, 0, 1);
    results.shift(0);
    var newItem = icons[Math.floor(Math.random() * icons.length)];
    results.unshift(newItem);
    updateReels();
    // Nudge complete
    if (results[0].fruit === results[1].fruit && results[1].fruit === results[2].fruit) {
      win = win + (results[0].value * bet);
      displayWin ();
      return;
    }
    if (results[3].fruit === results[4].fruit && results[4].fruit === results[5].fruit) {
      win = win + (results[3].value * bet);
      displayWin ();
      return;
    }
    if (results[6].fruit === results[7].fruit && results[7].fruit === results[8].fruit) {
      win = win + (results[6].value * bet);
      displayWin ();
      return;
    }
    displayNudges ();
    checkLastNudge();
  }
  if(command.dataset.method === "middle") {
    results.copyWithin(7, 4, 5);
    results.copyWithin(4, 1, 2);
    var newItem = icons[Math.floor(Math.random() * icons.length)];
    var holdItem = results[0];
    results.shift(0);
    results.shift(0);
    results.unshift(newItem);
    results.unshift(holdItem);
    updateReels();
    // Nudge complete
    if (results[0].fruit === results[1].fruit && results[1].fruit === results[2].fruit) {
      win = win + (results[0].value * bet);
      displayWin ();
      return;
    }
    if (results[3].fruit === results[4].fruit && results[4].fruit === results[5].fruit) {
      win = win + (results[3].value * bet);
      displayWin ();
      return;
    }
    if (results[6].fruit === results[7].fruit && results[7].fruit === results[8].fruit) {
      win = win + (results[6].value * bet);
      displayWin ();
      return;
    }
    displayNudges ();
    checkLastNudge();
  }
  if(command.dataset.method === "right") {
    results.copyWithin(8, 5, 6);
    results.copyWithin(5, 2, 3);
    var newItem = icons[Math.floor(Math.random() * icons.length)];
    var holdItem = results[0];
    var holdItem2 = results[1];
    results.shift(0);
    results.shift(0);
    results.shift(0);
    console.log(newItem);
    console.log(holdItem2);
    console.log(holdItem);
    results.unshift(newItem);
    results.unshift(holdItem2);
    results.unshift(holdItem);
    updateReels();
    // Nudge complete
    if (results[0].fruit === results[1].fruit && results[1].fruit === results[2].fruit) {
      win = win + (results[0].value * bet);
      displayWin ();
      return;
    }
    if (results[3].fruit === results[4].fruit && results[4].fruit === results[5].fruit) {
      win = win + (results[3].value * bet);
      displayWin ();
      return;
    }
    if (results[6].fruit === results[7].fruit && results[7].fruit === results[8].fruit) {
      win = win + (results[6].value * bet);
      displayWin ();
      return;
    }
    displayNudges ();
    checkLastNudge();
  }
}

function updateReels() {
  for (var x = 0; x < results.length; x++) {
    reels[x].style.backgroundImage = "url('img/" + results[x].fruit + ".png')";
  }
}

function checkLastNudge() {
  if (nudges === 0) {
    displays[3].style.background = "white";
    displays[3].innerText = "";
  }
}
