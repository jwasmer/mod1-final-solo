var classicFighters = ['rock', 'paper', 'scissors'];
var classicFighterImages = [
  'assets/rocks.png', 
  'assets/paper-roll.png', 
  'assets/scissor.png'];

var spicyFighters = ['meteor', 'tyrannosaurus', 'whale', 'water', 'fossil'];
var spicyFighterImages = [
  'assets/meteor.png', 
  'assets/tyrannosaurus-rex.png', 
  'assets/whale.png', 
  'assets/water-drop.png', 
  'assets/fossil.png'];

var computer;
var game;
var human;
var fighterDragged;

assignPlayers();

// ***** document. variables *****

var article = document.querySelector('article');
var classicIconForm = document.querySelector('.classic__choose-fighter');
var fightButton = document.querySelector('.controls__fight-btn');
var instruction1 = document.querySelector('.subtitle');
var main = document.querySelector('main');
var spicyMode = document.querySelector('.main__spicy-mode');
var spicyIconForm = document.querySelector('.spicy__choose-fighter');
var replayButton = document.querySelector('.controls__replay-btn');
var mainMenuButton = document.querySelector('.controls__menu-btn');

var classicIcons = document.querySelectorAll('.classic__fighter-icon');
var spicyIcons = document.querySelectorAll('.spicy__fighter-icon');

var classicMode = document.getElementById('classic');
var computerScore = document.getElementById('computer-score');
var gameControls = document.getElementById('game-controls');
var humanScore = document.getElementById('human-score');
var resolveWinner = document.getElementById('resolve');

// ***** Event Listeners *****

classicIconForm.addEventListener('click', chooseClassicFighter);
classicMode.addEventListener('click', buildClassicPage);
fightButton.addEventListener('click', playRound);
mainMenuButton.addEventListener('click', loadMainMenu);
replayButton.addEventListener('click', replayGame);
spicyIconForm.addEventListener('click', chooseSpicyFighter);
spicyMode.addEventListener('click', buildSpicyPage);

// ***** Main Menu *****

function assignPlayers() {
  human = new Player();
  computer = new Player();
}

function beginNewGame(fighters, fighterImages, mode) {
  game = new Game(fighters, fighterImages, mode);
  game.human = human;
  game.computer = computer;
}

function hideGameModeSelection() {
  classicMode.classList.add('hidden');
  spicyMode.classList.add('hidden');
}

function buildMainMenu(){
  classicMode.classList.remove('hidden');
  spicyMode.classList.remove('hidden');
  article.classList.remove('hidden');
}

function loadMainMenu() {
  event.preventDefault();
  hideSpicyPage();
  hideClassicPage();
  hideResolvePage();
  buildMainMenu();
}

function playRound() {
  event.preventDefault();
  computer.takeTurn();
  updateResolvePage();
  game.findMidpoint(game.fighters);
  game.findFighterOffset(game.midpoint, game.fighters, human.fighter);
  game.centerFighterOnMidpoint(game.fighters, human.offset);
  game.findComputerIndex(game.centeredFighters, computer.fighter);
  game.determineWinner(computer.fighter, human.fighter, game.midpoint);
}

// ***** Classic Mode *****

function buildClassicPage () {
  hideGameModeSelection();
  beginNewGame(classicFighters, classicFighterImages, 'classic');
  classicIconForm.classList.remove('hidden');
  gameControls.classList.remove('hidden');
  article.classList.add('hidden');
  instruction1.innerText = "Choose your fighter!";
  fightButton.disabled = true;
}

function hideClassicPage() {
  classicIconForm.classList.add('hidden');
  gameControls.classList.add('hidden');
  resolveWinner.classList.remove('hidden');
  instruction1.innerText = "Fight!";
}

function chooseClassicFighter (event) {
  if (human.fighter !== event.target.alt) {
    classicIcons.forEach(icon => icon.classList.remove('chosen-fighter'));
    human.takeTurn(event.target.alt);
    human.fighterImg = event.target.outerHTML;
    event.target.classList.add('chosen-fighter');
    fightButton.disabled = false;
  }
  else if (event.target.alt === human.fighter) {
    human.takeTurn('');
    event.target.classList.remove('chosen-fighter');
    fightButton.disabled = true;
  }
}

// ***** Spicy Mode *****

function buildSpicyPage () {
  hideGameModeSelection();
  beginNewGame(spicyFighters, spicyFighterImages, 'spicy');
  spicyIconForm.classList.remove('hidden');
  gameControls.classList.remove('hidden');
  article.classList.add('hidden');
  instruction1.innerText = "Choose your fighter!";
  fightButton.disabled = true;
}

function hideSpicyPage() {
  spicyIconForm.classList.add('hidden');
  gameControls.classList.add('hidden');
  resolveWinner.classList.remove('hidden');
  instruction1.innerText = "Fight!";
}

function chooseSpicyFighter (event) {
  if (human.fighter !== event.target.alt) {
    spicyIcons.forEach(icon => icon.classList.remove('chosen-fighter'));
    human.takeTurn(event.target.alt);
    human.fighterImg = event.target.outerHTML;
    event.target.classList.add('chosen-fighter');
    fightButton.disabled = false;
  }
  else if (event.target.alt === human.fighter) {
    human.takeTurn('');
    event.target.classList.remove('chosen-fighter');
    fightButton.disabled = true;
  }
}

// ***** Resolve Winner *****

function hideResolvePage() {
  resolveWinner.classList.add('hidden');
  replayButton.classList.add('hidden');
  fightButton.classList.remove('hidden');
}

function replayGame() {
  event.preventDefault();
  hideResolvePage();
  if (game.mode === 'classic') {
    console.log('classic');
    buildClassicPage();
  }
  else if (game.mode === 'spicy') {
    console.log('spicy');
    buildSpicyPage();
  }
}

function updateResolvePage() {
  event.preventDefault();
  game.fighters.forEach(fighter => {
    if (fighter === human.fighter) {
      human.fighterImg = game.fighterImages[game.fighters.indexOf(fighter)];
    }
    if (fighter === computer.fighter) {
      computer.fighterImg = game.fighterImages[game.fighters.indexOf(fighter)];
    }
  })
  if (game.fighters === classicFighters) {
    hideClassicPage();
  }
  else if (game.fighters === spicyFighters) {
    hideSpicyPage();
  }
}