//TODO:
//Make sure adjusting the view window size doesn't ruin the custom icons grid! 

var classicFighters = ['rock', 'paper', 'scissors']
var customFighters = []

var computer;
var game;
var human;
var fighterDragged;

assignPlayers()

var main = document.querySelector('main')
var classicIconForm = document.querySelector('.classic-icon-form')
var customIconForm = document.querySelector('.custom-icon-form')
var customIconOptions = document.querySelector('.custom-icon-options')
var customIconPicked = document.querySelector('.custom-icon-picked')
var customIcons = document.querySelector('.custom-icons')
var fightButton = document.querySelector('.fight-button')
var fighterLabel = document.querySelector('.fighter-label')
var instruction1 = document.querySelector('.instruction-1')
var instruction2 = document.querySelector('.instruction-2')
var customInstructions = document.querySelector('.custom-instructions')
var getStartedButton = document.querySelector('.get-started-button')
var checkOrderButton = document.querySelector('.check-order-button')
var customRules = document.querySelector('.custom-rules')
var startPlayingButton = document.querySelector('.start-playing-button')
var finalizeRules = document.querySelector('.finalize-rules')
var drawsAgainst = document.querySelector('.draws-against')
var spicyMode = document.querySelector('.menu-spicy-mode')
var resolveWinner = document.querySelector('.resolve-winner')

var classicIcons = document.querySelectorAll('.classic-icons')
var chosenFighters = customIconPicked.querySelectorAll('.custom-icons')

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
main.addEventListener('dragstart', (event) => makeDraggable(event))
getStartedButton.addEventListener('click', getStarted)
checkOrderButton.addEventListener('click', updateCustomFighters)
startPlayingButton.addEventListener('click', checkRules)

// ***** UI *****
function checkRules() {
  event.preventDefault()
  customRules.classList.add('hidden')
  finalizeRules.classList.remove('hidden')
  customFighters.forEach(image => {drawsAgainst.innerHTML += image})
}

function updateCustomFighters() {
  event.preventDefault()
  instruction1.innerText = "Check your matchups!"
  customIconOptions.classList.add('hidden')
  customIconPicked.classList.add('hidden')
  checkOrderButton.classList.add('hidden')
  customRules.classList.remove('hidden')
}

function getStarted(event) {
  event.preventDefault()
  customInstructions.classList.add('hidden')
  instruction1.innerText = "Drag your favorites!"
  customIconOptions.classList.remove('hidden')
  customIconPicked.classList.remove('hidden')
  checkOrderButton.classList.remove('hidden')
}

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
  else if (event.target === customIconPicked || event.target.parentNode === customIconPicked) {
    customFighters.push(fighterDragged.outerHTML)
    customIconOptions.removeChild(fighterDragged)
    customIconPicked.appendChild(fighterDragged)
  }
  else if (event.target === customIconOptions || event.target.parentNode === customIconOptions) {
    customFighters.splice(customFighters.indexOf(fighterDragged.outerHTML), 1)
    customIconPicked.removeChild(fighterDragged)
    customIconOptions.appendChild(fighterDragged)
  }
}

function hideGameModeSelection() {
  classicMode.classList.add('hidden')
  customMode.classList.add('hidden')
  spicyMode.classList.add('hidden')
}

function buildClassicPage () {
  hideGameModeSelection()
  beginNewGame(classicFighters)
  classicIconForm.classList.remove('hidden')
  gameControls.classList.remove('hidden')
  instruction1.innerText = "Choose your fighter!"
}

function hideClassicPage() {
  classicIconForm.classList.add('hidden')
  gameControls.classList.add('hidden')
  resolveWinner.classList.remove('hidden')
  instruction1.innerText = "Fight!"
}

function chooseClassicFighter (event) {
  if (human.fighter !== event.target.alt) {
    classicIcons.forEach(icon => icon.classList.remove('selected-fighter'))
    human.fighter = event.target.alt
    event.target.classList.add('selected-fighter')
  }
  else if (event.target.alt === human.fighter) {
    human.takeTurn('')
    event.target.classList.remove('selected-fighter')
  }
}

function buildCustomPage() {
  hideGameModeSelection()
  beginNewGame(customFighters)
  // customIconOptions.classList.remove('hidden')
  // customIconPicked.classList.remove('hidden')
  // gameControls.classList.remove('hidden')
  customInstructions.classList.remove('hidden')
  instruction1.innerText = "Welcome to Custom Mode!"
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