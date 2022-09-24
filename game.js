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
}

