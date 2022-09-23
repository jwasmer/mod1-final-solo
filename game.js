class Game {
  constructor(fightersArray, mode) {
    this.gameMode = mode
    this.fighters = fightersArray
    this.centeredFighters = []
    this.isOdd = true
    this.midpoint;
    this.offset;
  }
  assignFighters(humanFighter) {
    human.takeTurn(humanFighter)
    computer.takeTurn()
  }
}

