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

// Pseudocode
// Goal: To build a system that would be able to resolve a rock/paper/scissors game of indefinite size using the position of each fighter element within an array to determine which other fighter elements it will defeat or be defeated by.
// Data: 
// * An array containing an odd number of elements, each representing a fighter.
// * An input, provided by a human player, selecting which fighter they which to play that round.
// * A randomly chosen fighter selected by their computer opponent which the human will play against.
// Questions: Is there an elegant way to "wrap" an array? That is, in an array of 5 values, read the array in an order like [[3], [4], [0], [1], [2]]? (Answer: YES! Use % and the array length)

// Step 1: Determine whether the array provided contains an odd number of elements. The rock/paper/scissors logic can be applied to any odd number of fighters, but the game logic cannot resolve wins and losses correctly when an even number of fighters is provided.
// Step 2: Find the midpoint of the provided array. This solution will resolve all conflicts by shifting the array to place the human controlled fighter at the midpoint--elements to the left will defeat the midpoint element, and elements to the right will be defeated by the midpoint element.
// Step 3: Assign some kind of offset value to each element in the array (elements may need to be an object or array themselves for this to work). This offset will represent where our starting position in the array must be for us to consider that element a midpoint. For instance, in an array of 5 elements, the 3rd element (2nd index position) will have an offset value of 0 as it already occupies the midpoint position of the array--[[0], [1], [2], [3], [4]]. The 4th element will have an offset of 1, as our starting position in the array will need to be 1 for that element to be at the array's midpoint [[1], [2], [3], [4], [0]].
// Step 4: Look up the offset value of our selected fighter in the array and shift the array (probably just make a new array) to place that fighter at its midpoint.
// Step 5: At this point, everything to the left beats the human fighter, and everything to the right is beaten by the human fighter. Should allow players to make their own array and build their own rock/paper/scissors matches dynamically!

// Verifies that our input array contains an odd number of elements. Also lets me practice ternerys!
function checkArrayForOddness(array) {
  array.length % 2 === 0 ? true : false
}

// Finds the midpoint index position of our input array.
function findArrayMidpoint(array) {
  return Math.ceil(array.length / 2) - 1
}

// Runs a standard for loop, but tracks our position within the array starting from the midpoint instead of from index position 0. The tracker will wrap once it reaches the end of the array and start at the beginning.
function addOffsetValues(array) {
  var midpoint = findArrayMidpoint(array)
  for (var i = 0; i < array.length; i++) {
    var midpointIndexTracker = (i + midpoint) % array.length
    array[midpointIndexTracker].push(i)
  }
}