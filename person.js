class Person {
  constructor() {
    this.fighter = ''
    this.offset = 0
    this.index = 0
    // Win/Loss/Draw
    this.wins = 0
  }
  takeTurn(fighter) {
    this.fighter = fighter || this.randomizeFighter(game.fighters)
  }
  randomizeFighter(fighters) {
    return game.fighters[Math.floor(Math.random() * fighters.length)]
  }
}