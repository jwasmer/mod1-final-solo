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
}

