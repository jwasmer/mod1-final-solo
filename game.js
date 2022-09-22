class Game {
  constructor(fightersArray) {
    this.gameMode;
    this.fighters = []
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
}

