class Game {
  constructor(fightersArray, mode) {
    this.fighters = fightersArray
    this.centeredFighters = []
    this.isOdd = true
    this.midpoint;
    this.offset;
  }

  findMidpoint(array) {
    game.midpoint = Math.ceil(array.length / 2)
  }

  findFighterOffset(midpoint, array, fighter) {
    for (var i = 0; i < array.length; i++) {
      var offset = (i + midpoint - 1) % array.length
      if (fighter === array[offset]) {
        human.offset = i
      }
    }
  }

  centerFighterOnMidpoint(array, humanOffset) {
    game.centeredFighters = []
    for (var i = 0; i < array.length; i++) {
      var offset = (i + humanOffset) % array.length
      game.centeredFighters.push(array[offset])
    }
  }

  findComputerIndex(centeredArray, fighter) {
    computer.index = centeredArray.indexOf(fighter) + 1
  }
  
  determineWinner(computerFighter, humanFighter, midpoint) {
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
}

