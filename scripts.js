var classicFighters = ['rock', 'paper', 'scissors']
var customFighters = []

var computer;
var game;
var human;

var classicIconForm = document.querySelector('.classic-icon-form')
var customIcons = document.querySelector('.custom-icons')
var fightButton = document.querySelector('.fight-button')
var fighterLabel = document.querySelector('.fighter-label')
var instructionHeader = document.querySelector('.instruction')

var classicIcons = document.querySelectorAll('.classic-icons')

var classicMode = document.getElementById('classic')
var computerScore = document.getElementById('computer-score')
var customMode = document.getElementById('custom')
var gameControls = document.getElementById('game-controls')
var humanScore = document.getElementById('human-score')

classicIconForm.addEventListener('click', chooseClassicFighter)
classicMode.addEventListener('click', buildClassicPage)
customMode.addEventListener('click', buildCustomPage)
fightButton.addEventListener('click', playClassicRound)

// ***** UI *****
function hideGameModeSelection() {
  classicMode.classList.add('hidden')
  customMode.classList.add('hidden')
  instructionHeader.innerText = "Choose your fighter!"
}

function buildClassicPage () {
  hideGameModeSelection()
  assignPlayers()
  beginNewGame(classicFighters)
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
    human.takeTurn('')
    fighterLabel.innerText = ''
    event.target.classList.remove('selected-fighter')
  }
}

function buildCustomPage() {
  hideGameModeSelection()
}

// function revealGameModeSelection() {
//   instructionHeader.innerText = "Choose your game!"
// }

// Game logic

function assignPlayers() {
  human = new Person()
  computer = new Person()
}

function beginNewGame(fightersArray, mode) {
  game = new Game(fightersArray, mode)
}

function playClassicRound() {
  event.preventDefault();
  computer.takeTurn()
  game.findMidpoint(game.fighters)
  game.findFighterOffset(game.midpoint, game.fighters, human.fighter)
  game.centerFighterOnMidpoint(game.fighters, human.offset)
  game.findComputerIndex(game.centeredFighters, computer.fighter)
  game.determineWinner(computer.fighter, human.fighter, game.midpoint)
}