var classicFighters = ['rock', 'paper', 'scissors']
var classicFighterImages = [
  'assets/rocks.png', 
  'assets/paper-roll.png', 
  'assets/scissor.png']

var spicyFighters = ['meteor', 'tyrannosaurus', 'whale', 'water', 'fossil']
var spicyFighterImages = [
  'assets/meteor.png', 
  'assets/tyrannosaurus-rex.png', 
  'assets/whale.png', 
  'assets/water-drop.png', 
  'assets/fossil.png']

var customFighters = []
var customFighterImages = []

var computer;
var game;
var human;
var fighterDragged;

assignPlayers()

var checkOrderButton = document.querySelector('.custom__choose-fighter-btn')
var classicIconForm = document.querySelector('.classic__choose-fighter')
var customIconForm = document.querySelector('.custom-icon-form')
var customIconOptions = document.querySelector('.custom__fighter-choices')
var customIconPicked = document.querySelector('.custom__fighters-chosen')
var customIcons = document.querySelector('custom__fighters')
var customInstructions = document.querySelector('.custom__instruction-text')
var fightButton = document.querySelector('.controls__fight-btn')
var getStartedButton = document.querySelector('.custom__leave-tutorial-btn')
var instruction1 = document.querySelector('.subtitle')
var instruction2 = document.querySelector('.custom__fighters-chosen-text')
var main = document.querySelector('main')
var spicyMode = document.querySelector('.main__spicy-mode')
var spicyIconForm = document.querySelector('.spicy__choose-fighter')
var replayButton = document.querySelector('.controls__replay-btn')
var classicIcons = document.querySelectorAll('.classic__fighter-icon')
var chosenFighters = customIconPicked.querySelectorAll('custom__fighters')
var spicyIcons = document.querySelectorAll('.spicy__fighter-icon')

var classicMode = document.getElementById('classic')
var computerScore = document.getElementById('computer-score')
var customMode = document.getElementById('custom')
var gameControls = document.getElementById('game-controls')
var humanScore = document.getElementById('human-score')
var resolveWinner = document.getElementById('resolve')

checkOrderButton.addEventListener('click', updateCustomFighters)
classicIconForm.addEventListener('click', chooseClassicFighter)
classicMode.addEventListener('click', buildClassicPage)
customMode.addEventListener('click', buildCustomPage)
// customIconPicked.addEventListener('dragover', (event) => {event.preventDefault()})
// customIconPicked.addEventListener('drop', (event) => {dropFighter(event)})
// customIconOptions.addEventListener('dragover', (event) => {event.preventDefault()})
// customIconOptions.addEventListener('drop', (event) => {dropFighter(event)})
fightButton.addEventListener('click', playRound)
getStartedButton.addEventListener('click', getStarted)
main.addEventListener('dragstart', (event) => makeDraggable(event))
replayButton.addEventListener('click', replayGame)
spicyIconForm.addEventListener('click', chooseSpicyFighter)
spicyMode.addEventListener('click', buildSpicyPage)

// ***** Main Menu *****

function assignPlayers() {
  human = new Person()
  computer = new Person()
}

function beginNewGame(fighters, fighterImages) {
  game = new Game(fighters, fighterImages)
}

function hideGameModeSelection() {
  classicMode.classList.add('hidden')
  customMode.classList.add('hidden')
  spicyMode.classList.add('hidden')
}

function playRound() {
  event.preventDefault();
  computer.takeTurn()
  updateResolvePage()
  game.findMidpoint(game.fighters)
  game.findFighterOffset(game.midpoint, game.fighters, human.fighter)
  game.centerFighterOnMidpoint(game.fighters, human.offset)
  game.findComputerIndex(game.centeredFighters, computer.fighter)
  game.determineWinner(computer.fighter, human.fighter, game.midpoint)
}

// ***** Classic Mode *****

function buildClassicPage () {
  hideGameModeSelection()
  beginNewGame(classicFighters, classicFighterImages)
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
    classicIcons.forEach(icon => icon.classList.remove('chosen-fighter'))
    human.takeTurn(event.target.alt)
    human.fighterImg = event.target.outerHTML
    event.target.classList.add('chosen-fighter')
  }
  else if (event.target.alt === human.fighter) {
    human.takeTurn('')
    event.target.classList.remove('chosen-fighter')
  }
}

// ***** Spicy Mode *****

function buildSpicyPage () {
  hideGameModeSelection()
  beginNewGame(spicyFighters, spicyFighterImages)
  spicyIconForm.classList.remove('hidden')
  gameControls.classList.remove('hidden')
  instruction1.innerText = "Choose your fighter!"
}

function hideSpicyPage() {
  spicyIconForm.classList.add('hidden')
  gameControls.classList.add('hidden')
  resolveWinner.classList.remove('hidden')
  instruction1.innerText = "Fight!"
}

function chooseSpicyFighter (event) {
  if (human.fighter !== event.target.alt) {
    spicyIcons.forEach(icon => icon.classList.remove('chosen-fighter'))
    human.takeTurn(event.target.alt)
    human.fighterImg = event.target.outerHTML
    event.target.classList.add('chosen-fighter')
  }
  else if (event.target.alt === human.fighter) {
    human.takeTurn('')
    event.target.classList.remove('chosen-fighter')
  }
}

// ***** Custom Mode *****

function buildCustomPage() {
  hideGameModeSelection()
  beginNewGame(customFighters)
  // customIconOptions.classList.remove('hidden')
  // customIconPicked.classList.remove('hidden')
  // gameControls.classList.remove('hidden')
  customInstructions.classList.remove('hidden')
  instruction1.innerText = "Welcome to Custom Mode!"
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

function updateCustomFighters() {
  event.preventDefault()
  instruction1.innerText = "Check your matchups!"
  customIconOptions.classList.add('hidden')
  customIconPicked.classList.add('hidden')
  checkOrderButton.classList.add('hidden')
  customRules.classList.remove('hidden')
}

function checkRules() {
  event.preventDefault()
  customRules.classList.add('hidden')
  finalizeRules.classList.remove('hidden')
  customFighters.forEach(image => {drawsAgainst.innerHTML += image})
}

// ***** Resolve Winner *****

function replayGame() {
  event.preventDefault()
  resolveWinner.classList.add('hidden')
  replayButton.classList.add('hidden')
  fightButton.classList.remove('hidden')
  if (game.fighters === classicFighters) {
    buildClassicPage()
  }
  else if (game.fighters === spicyFighters) {
    buildClassicPage()
  }
}

function updateResolvePage() {
  event.preventDefault()
  if (human.fighter === '') {
    console.log("You need to pick a fighter")
    return 
  }
  game.fighters.forEach(fighter => {
    if (fighter === human.fighter) {
      human.fighterImg = game.fighterImages[game.fighters.indexOf(fighter)]
    }
    if (fighter === computer.fighter) {
      computer.fighterImg = game.fighterImages[game.fighters.indexOf(fighter)]
    }
  })
  if (game.fighters === classicFighters) {
    hideClassicPage()
  }
  else if (game.fighters === spicyFighters) {
    hideSpicyPage()
  }
}