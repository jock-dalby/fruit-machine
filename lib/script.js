/*****************************************
 Declare variables & define all the keys
*****************************************/
var bet = 2;
var money = 100;
var win = 0;
var credit = document.getElementById("credit");
var winScreen = document.getElementById("current-win");
var reels = document.getElementsByClassName("reel");
var buttons = document.getElementsByClassName("button");

var results = [];
credit.innerText="$" + money;

var icons = [
  {fruit: "cheese", value: 10},
  {fruit: "cherries", value: 20},
  {fruit: "grapes", value: 30},
  {fruit: "slots-bell", value: 40},
  {fruit: "watermelon", value: 50}
]

for (var i = buttons.length - 1; i >= 0; i--) {
  var el = buttons[i];
  el.addEventListener('click', function(e){
    var currentButton = e.path[1].dataset.type;
    if(currentButton === "hold") {

    }
    if(currentButton === "nudge") {

    }
    if(currentButton === "spin") {
      win = 0;
      if(money === 0) {
        return;
      }
      spin();
      checkWin();
      manageFunds();
      winScreen.innerText = "$" + win;
    }
  })
}

// Spin function
function manageFunds() {
  money = money - bet + win;
  credit.innerText="$" + money;

}

function spin () {
  for (var j = reels.length - 1; j >= 0; j--) {
    var x = Math.floor(Math.random() * icons.length);
    reels[j].style.backgroundImage = "url('img/" + icons[x].fruit + ".png')";
    results.push(icons[x].fruit);
  }
}

function checkWin () {
  if (results[3] === results[4] && results[4] === results[5]) {
    win = icons[3].value;
  }
  results = [];
}
