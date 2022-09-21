class Game {
  constructor(gameType) {
    this.gameMode;
    this.fighters = {}
    this.winConditions = {}
  }
  updateGameType(mode) {
    this.gameMode = mode
    if (this.gameMode === `classic`) {
      this.winConditions = classicWinConditions
    }
    if (this.gameMode === `hard`) {
      this.winConditions = hardWinConditions
    }
  }
  chooseFighter(fighter) {
    console.log(`You've chosen ${fighter}!`)
  }
}

