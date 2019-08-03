/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const hold = document.querySelector(".btn-hold");
const rollBtn = document.querySelector(".btn-roll");
const newBtn = document.querySelector(".btn-new");

let player = "0";
let previousPlayer = "1";
let winner = null;
let player1Points = 0;
let player2Points = 0;
let currentPoints = 0;

newBtn.addEventListener("click", () => {
  window.location.reload();
});

rollBtn.addEventListener("click", () => {
  rollDice(player);
});

hold.addEventListener("click", () => holdPoints(currentPoints, player));

function rollDice(playerToMove) {
  let dice = Math.floor(Math.random() * 6) + 1;
  document.querySelector(".dice").src = `./dice-${dice}.png`;
  if (dice !== 1) {
    currentPoints += dice;
    document.querySelector(`#current-${player}`).textContent = currentPoints;
  }
  if (dice === 1) {
    currentPoints = 0;
    document.querySelector(`#current-${player}`).textContent = currentPoints;
    changePlayer(playerToMove);
  }
}

function holdPoints(currentPoint, playerToMove) {
  //console.log(currentPoints, player);
  if (currentPoint === 0) {
    return;
  }
  if (player === "0") {
    player1Points += currentPoint;
    document.querySelector(`#current-${player}`).textContent = 0;
    document.querySelector(`#score-${player}`).textContent = player1Points;
    currentPoints = 0;
  } else if (player === "1") {
    player2Points += currentPoint;
    document.querySelector(`#current-${player}`).textContent = 0;
    document.querySelector(`#score-${player}`).textContent = player2Points;
    currentPoints = 0;
  }
  winner = isWinner();
  if (winner) {
    let winnerToStyle = parseInt(winner);
    document.getElementById(`name-${winnerToStyle}`).style.color = "#eb4d4d";
    document.getElementById(`name-${winnerToStyle}`).textContent =
      "WINNER!!!!!";
    document
      .querySelector(`.player-${winnerToStyle}-panel`)
      .classList.add("winner");
    rollBtn.disabled = true;
    hold.disabled = true;
  }
  changePlayer(playerToMove);
}

function changePlayer(playerToMove) {
  let temp = playerToMove;
  player = previousPlayer;
  previousPlayer = temp;
  document.querySelector(`.player-${player}-panel`).classList.add("active");
  document
    .querySelector(`.player-${previousPlayer}-panel`)
    .classList.remove("active");
}

function isWinner() {
  if (player1Points >= 100) {
    return "0";
  } else if (player2Points >= 100) {
    return "1";
  }
}
