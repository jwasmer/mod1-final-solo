class Person {
  constructor() {
    this.fighter;
    this.offset = 0
    this.index = 0
    this.scores = [{win: 0, loss: 0, draw: 0}, {win: 0, loss: 0, draw: 0}]
  }
  takeTurn(fighter) {
    this.fighter = fighter || randomizeFighter()
  }
}