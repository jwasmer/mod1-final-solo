class Person {
  constructor() {
    this.fighter = ''
    this.scores = [{win: 0, loss: 0, draw: 0}, {win: 0, loss: 0, draw: 0}]
  }
  takeTurn(fighter) {
    this.fighter = fighter || randomizeFighter()
  }
}