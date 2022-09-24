var classicFighters = ['rock', 'paper', 'scissors']
var customFighters = []

var computer;
var game;
var human;
var fighterDragged;

assignPlayers()

var classicIconForm = document.querySelector('.classic-icon-form')
var customIconForm = document.querySelector('.custom-icon-form')
var customIconOptions = document.querySelector('.custom-icon-options')
var customIconPicked = document.querySelector('.custom-icon-picked')
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
customIconPicked.addEventListener('dragover', (event) => {event.preventDefault()})
customIconPicked.addEventListener('drop', (event) => {dropFighter(event)})
customIconOptions.addEventListener('dragover', (event) => {event.preventDefault()})
customIconOptions.addEventListener('drop', (event) => {dropFighter(event)})
customIconForm.addEventListener('dragstart', (event) => makeDraggable(event))

// ***** UI *****
function makeDraggable(event) {
  if (event.target.dataset.draggable === "true") {
    fighterDragged = event.target
  }
}

function dropFighter(event) {
  event.preventDefault()
  if (event.target === fighterDragged) {
    return
  }
  else if (event.target === customIconPicked || event.target === customIconOptions) {
    fighterDragged.parentNode.removeChild(fighterDragged)
    event.target.appendChild(fighterDragged)
  }
  else if (event.target.dataset.draggable === "true") {
    fighterDragged.parentNode.removeChild(fighterDragged)
    event.target.parentNode.appendChild(fighterDragged)
  }
}

function hideGameModeSelection() {
  classicMode.classList.add('hidden')
  customMode.classList.add('hidden')
  instructionHeader.innerText = "Choose your fighter!"
}

function buildClassicPage () {
  hideGameModeSelection()
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
  beginNewGame(customFighters)
  customIconForm.classList.remove('hidden')
  gameControls.classList.remove('hidden')
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