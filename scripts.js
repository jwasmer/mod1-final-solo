var classicFighters = ['rock', 'paper', 'scissors']
var customFighters = []

var human;
var computer;
var game;

// var modeWindow = document.querySelector('main')
var menuHeader = document.getElementById('header-change')
var classicMode = document.getElementById('classic')
var hardMode = document.getElementById('hard')
var customMode = document.getElementById('custom')
var classicIcons = document.querySelector('.classic-icons')
var hardIcons = document.querySelector('.hard-icons')
var customIcons = document.querySelector('.custom-icons')

classicMode.addEventListener('click', buildClassicPage)
hardMode.addEventListener('click', buildHardPage)
customMode.addEventListener('click', buildCustomPage)
classicIcons.addEventListener('click', chooseClassicFighter)

function buildClassicPage () {
  hideGameModeSelection()
  classicIcons.classList.remove('hidden')
}

function chooseClassicFighter (event) {
  if (event.target.nodeName === "IMG") {
    human.fighter = event.target.alt
  }
}

function buildHardPage() {
  hideGameModeSelection()
}

function buildCustomPage() {
  hideGameModeSelection()
}

function hideGameModeSelection() {
  classicMode.classList.add('hidden')
  hardMode.classList.add('hidden')
  customMode.classList.add('hidden')
  menuHeader.innerText = "Choose your fighter!"
}

function revealGameModeSelection() {
  menuHeader.innerText = "Choose your game!"
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
  else if (computer.index > midpoint) {
    return `Your opponent's ${computerFighter} beats your ${humanFighter}! Defeat!`
  }
  else {
    return `Your ${humanFighter} defeats your opponent's ${computerFighter}! Victory!`
  }
}

assignPlayers()
beginNewGame(classicFighters, 'classic')
assignFighters(`lizard`)
checkForOddness(game.fighters)
findMidpoint(game.fighters)
findFighterOffset(game.midpoint, game.fighters, human.fighter)
centerFighterOnMidpoint(game.fighters, human.offset)
findComputerIndex(game.centeredFighters, computer.fighter)
console.log(determineWinner(computer.fighter, human.fighter, game.midpoint))