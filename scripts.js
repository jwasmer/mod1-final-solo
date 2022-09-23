var classicFighters = ['rock', 'paper', 'scissors']
var hardFighters = ['rock', 'paper', 'scissors', 'lizard', 'spock']
var customFighters = []

var human;
var computer;
var game;

var modeWindow = document.querySelector('main')
modeWindow.addEventListener('click', chooseGameMode)

function chooseGameMode(event) {
  if (event.target.classList.contains('classic-mode')) {
    loadClassicMode()
  }
  else if (event.target.classList.contains('hard-mode')) {
    loadHardMode()
  }
  else if (event.target.classList.contains('custom-mode')) {
    loadCustomMode()
  } 
}

function assignPlayers() {
  human = new Person()
  computer = new Person()
}

function beginNewGame(fightersArray, mode) {
  game = new Game(fightersArray, mode)
}

function assignFighters(humanFighter) {
  human.takeTurn(humanFighter)
  computer.takeTurn()
}

function checkForOddness(array) {
  if (array.length % 2 !== 0) {
    game.isOdd = false
  }
}

function findMidpoint(array) {
  game.midpoint = Math.ceil(array.length / 2)
}

function findFighterOffset(midpoint, array, fighter) {
  for (var i = 0; i < array.length; i++) {
    var offset = (i + midpoint - 1) % array.length
    if (fighter === array[offset]) {
      human.offset = i
    }
  }
}

function centerFighterOnMidpoint(array, humanOffset) {
  for (var i = 0; i < array.length; i++) {
    var offset = (i + humanOffset) % array.length
    game.centeredFighters.push(array[offset])
  }
  console.log(game.centeredFighters)
}

function findComputerIndex(centeredArray, fighter) {
  computer.index = centeredArray.indexOf(fighter) + 1
}

function determineWinner(computerFighter, humanFighter, midpoint) {
  if (computer.index === midpoint) {
    return `You both chose ${computerFighter}, it's a draw!`
  }
  else if (computer.index < midpoint) {
    return `Your opponent's ${computerFighter} beats your ${humanFighter}! Defeat!`
  }
  else {
    return `Your ${humanFighter} defeats your opponent's ${computerFighter}! Victory!`
  }
}

assignPlayers()
beginNewGame(hardFighters, 'hard')
assignFighters(`lizard`)
checkForOddness(game.fighters)
findMidpoint(game.fighters)
findFighterOffset(game.midpoint, game.fighters, human.fighter)
centerFighterOnMidpoint(game.fighters, human.offset)
findComputerIndex(game.centeredFighters, computer.fighter)
console.log(determineWinner(computer.fighter, human.fighter, game.midpoint))