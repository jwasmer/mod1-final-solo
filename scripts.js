var classicFighters = ['rock', 'paper', 'scissors']
var hardFighters = ['rock', 'paper', 'scissors', 'lizard', 'spock']

var human = new Person();
var computer = new Person();
var game = new Game();

function newGame() {
  var mode = prompt("choose your game mode! (classic or hard)")
  game.updateGameType(mode)
  chooseFighter()
}

function chooseFighter() {
  var fighter = prompt(`choose your fighter! (rock, paper, or scissors)`)
  human.takeTurn(fighter)
  computer.takeTurn(`rock`)
  console.log(`you chose ${human.fighter}, and your opponent chose ${computer.fighter}!`)
  chooseWinner()
}
function chooseWinner() {

}

function updateScore

newGame()

