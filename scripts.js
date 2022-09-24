var classicFighters = ['rock', 'paper', 'scissors']
var customFighters = []

var human;
var computer;
var game;

var instructionHeader = document.querySelector('.instruction')
var classicMode = document.getElementById('classic')
var customMode = document.getElementById('custom')
var classicIconForm = document.querySelector('.classic-icon-form')
var classicIcons = document.querySelectorAll('.classic-icons')
var customIcons = document.querySelector('.custom-icons')
var gameControls = document.getElementById('game-controls')
var fighterLabel = document.querySelector('.selected-fighter-text')
var fightButton = document.querySelector('.fight-button')
var humanScore = document.getElementById('human-score')
var computerScore = document.getElementById('computer-score')


classicMode.addEventListener('click', buildClassicPage)
customMode.addEventListener('click', buildCustomPage)
classicIconForm.addEventListener('click', chooseClassicFighter)
fightButton.addEventListener('click', playClassicRound)

// UI elements
function buildClassicPage () {
  hideGameModeSelection()
  assignPlayers()
  beginNewGame(classicFighters, 'classic')
  classicIconForm.classList.remove('hidden')
  gameControls.classList.remove('hidden')
}

function chooseClassicFighter (event) {
  if (human.fighter !== event.target.alt) {
    classicIcons.forEach(icon => icon.classList.remove('selected-fighter'))
    human.fighter = event.target.alt
    fighterLabel.innerText = `${human.fighter.toUpperCase()}!`
    event.target.classList.add('selected-fighter')
    
  }
  else if (event.target.alt === human.fighter) {
    console.log('2')
    human.takeTurn('')
    fighterLabel.innerText = ''
    event.target.classList.remove('selected-fighter')
  }
}

function buildCustomPage() {
  hideGameModeSelection()
}

function hideGameModeSelection() {
  classicMode.classList.add('hidden')
  customMode.classList.add('hidden')
  instructionHeader.innerText = "Choose your fighter!"
}

function revealGameModeSelection() {
  instructionHeader.innerText = "Choose your game!"
}


// Game logic

function assignPlayers() {
  human = new Person()
  computer = new Person()
}

function beginNewGame(fightersArray, mode) {
  game = new Game(fightersArray, mode)
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
  game.centeredFighters = []
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
    console.log(`You both chose ${computerFighter}, it's a draw!`)
  }
  else if (computer.index > midpoint) {
    console.log(`Your opponent's ${computerFighter} beats your ${humanFighter}! Defeat!`)
    computer.wins++
    computerScore.innerText = `Wins: ${computer.wins}`
  }
  else {
    console.log(`Your ${humanFighter} defeats your opponent's ${computerFighter}! Victory!`)
    human.wins++
    humanScore.innerText = `Wins: ${human.wins}`
  }
}

function playClassicRound() {
  event.preventDefault();
  computer.takeTurn()
  findMidpoint(game.fighters)
  findFighterOffset(game.midpoint, game.fighters, human.fighter)
  centerFighterOnMidpoint(game.fighters, human.offset)
  findComputerIndex(game.centeredFighters, computer.fighter)
  determineWinner(computer.fighter, human.fighter, game.midpoint)
}

// assignPlayers()
// beginNewGame(classicFighters, 'classic')
// assignFighters(`lizard`)
// checkForOddness(game.fighters)
// findMidpoint(game.fighters)
// findFighterOffset(game.midpoint, game.fighters, human.fighter)
// centerFighterOnMidpoint(game.fighters, human.offset)
// findComputerIndex(game.centeredFighters, computer.fighter)
// console.log(determineWinner(computer.fighter, human.fighter, game.midpoint))