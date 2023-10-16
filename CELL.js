class CELL {
  constructor(posX, posY, walls, entrance, exit) {
    this.posX = posX;
    this.posY = posY;
    this.walls = walls
    this.entrance = entrance
    this.exit = exit 
    this.checked = false
  }

  caseCheckedCell(){
    if (this.checked){
        return true
    } else {
        return false
    }
  }



  test(){
    console.log("test")
  }
}
