class Game {
  constructor(fighters, fighterImages, mode) {
    this.fighters = fighters
    this.fighterImages = fighterImages
    this.mode = mode
    this.centeredFighters = []
    this.isOdd = true
    this.midpoint;
    this.offset;
  }

  checkForOddness(array) {
    if (array.length % 2 !== 0) {
      game.isOdd = false
    }
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
    var outcome = ''
    if (computer.index === midpoint) {
      outcome = `You both chose ${computerFighter}, it's a draw!`
    }
    else if (computer.index > midpoint) {
      outcome = `Your opponent's ${computerFighter} beats your ${humanFighter}! Defeat!`
      computer.wins++
      computerScore.innerText = `Wins: ${computer.wins}`
    }
    else {
      outcome = `Your ${humanFighter} defeats your opponent's ${computerFighter}! Victory!`
      human.wins++
      humanScore.innerText = `Wins: ${human.wins}`
    }
    resolveWinner.innerHTML = `
    <div class="flex resolve__images-container">
      <img class="resolve__fighters-size" src=${human.fighterImg} alt=${human.fighter}> 
      <img class="resolve__fight-size" src="assets/fight.png" alt="versus">
      <img class="resolve__fighters-size" src=${computer.fighterImg} alt=${computer.fighter}>
    </div>
    <h2> ${outcome} </h2>`
    gameControls.classList.remove('hidden')
    fightButton.classList.add('hidden')
    replayButton.classList.remove('hidden')
  }
}

