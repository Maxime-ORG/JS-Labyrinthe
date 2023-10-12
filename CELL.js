class CELL {
  constructor(posX, posY, walls, entrance, exit) {
    this.posX = posX;
    this.posY = posY;
    this.walls = walls
    this.entrance = entrance
    this.exit = exit 
  }

  caseChecked(caseActuel, path){
    caseCheck = path.filter(function(element){
        return (element == caseActuel)
    })
    if (caseCheck.length == 1){
        return true
    } else {
        return false
    }
  }
}
