var classicFighters = ['rock', 'paper', 'scissors']
var hardFighters = ['rock', 'paper', 'scissors', 'lizard', 'spock']

var human = new Person();
var computer = new Person();
var game = new Game();

// Pseudocode
// Goal: To build a system that would be able to resolve a rock/paper/scissors game of indefinite size using the position of each fighter element within an array to determine which other fighter elements it will defeat or be defeated by.
// Data: 
// * An array containing an odd number of elements, each representing a fighter.
// * An input, provided by a human player, selecting which fighter they which to play that round.
// * A randomly chosen fighter selected by their computer opponent which the human will play against.
// Questions: Is there an elegant way to "wrap" an array? That is, in an array of 5 values, read the array in an order like [[3], [4], [0], [1], [2]]? (Answer: YES! Use % and the array length)

// Step 1: Determine whether the array provided contains an odd number of elements. The rock/paper/scissors logic can be applied to any odd number of fighters, but the game logic cannot resolve wins and losses correctly when an even number of fighters is provided.
// Step 2: Find the midpoint of the provided array. This solution will resolve all conflicts by shifting the array to place the human controlled fighter at the midpoint--elements to the left will defeat the midpoint element, and elements to the right will be defeated by the midpoint element.
// Step 3: Forget all that about the offset value. We don't need an offset, we just need to know positions relative to the midpoint. Adding an offset value works fine, but it doesn't seem like the most streamlined solution. If we locate our human fighter on our first pass, starting at the midpoint, we should just be able to pull it out and adjust everything relative to that.
// Step 4: Look up the offset value of our selected fighter in the array and shift the array (probably just make a new array) to place that fighter at its midpoint.
// Step 5: At this point, everything to the left beats the human fighter, and everything to the right is beaten by the human fighter. Should allow players to make their own array and build their own rock/paper/scissors matches dynamically!

// Verifies that our input array contains an odd number of elements. Also lets me practice ternerys!
function checkForOddness(array) {
  return array.length % 2 === 0 ? true : false
}

// Verifies the human player's fighter is present in the provided array of fighters.
function verifyFighter(humanFighter, array) {
  for (var fighter of array) {
    if (fighter === humanFighter) {
      return true
    }
  }
}

// Finds the midpoint of our input array (based on array length, not array index position)
function findMidpoint(array) {
  return Math.ceil(array.length / 2)
}

// Runs a standard for loop, but tracks our position within the array starting from the midpoint instead of from index position 0. The tracker will wrap once it reaches the end of the array and start at the beginning. 
function findFighterOffset(midpoint, array, fighter) {
  for (var i = 0; i < array.length; i++) {
    var offset = (i + midpoint) % array.length
    if (fighter === array[offsetTracker]) {
      return offset
    }
  }
}

// Creates a new array, unique to this turn, which places the human selected fighter at the midpoint of the array using the offset. It maintains all other relationships within the array as if the array had wrapped from the end back to the beginning.
function centerFighterOnMidpoint(array, offset) {
  var centeredFighters = []
  for (var i = 0; i < fighters.length; i++) {
    var offsetTracker = (i + offset - 1) % array.length
    centeredFighters.push(fighters[offsetTracker])
  }
  return centeredFighters
}