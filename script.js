//direction : h d b g 
function caseACotee(directionX, directionY, labyrinthe, caseActuel){
    x = caseActuel.posX
    y = caseActuel.posY
    maCase = labyrinthe.filter(function(element){
        return ((element.posX == (x + directionX)) && (element.posY == (y + directionY)))
    })
    return maCase[0]
}

function caseChecked(caseActuel, path){
    caseCheck = path.filter(function(element){
        return (element == caseActuel)
    })
    if (caseCheck.length == 1){
        return true
    } else {
        return false
    }
}


function getCellsAround(labyrintheCells, cellToCheck, arrayCellChecked){
    let cellsAround =[]
    if(!cellToCheck.walls[0] && !caseChecked(caseACotee(-1,0,labyrintheCells, cellToCheck),arrayCellChecked)){
        cellsAround.push(caseACotee(-1,0,labyrintheCells, cellToCheck))
    } 
    if (!cellToCheck.walls[1] && !caseChecked(caseACotee(0,1,labyrintheCells, cellToCheck),arrayCellChecked)){
        cellsAround.push(caseACotee(0,1,labyrintheCells, cellToCheck))
    } 
    if (!cellToCheck.walls[2] && !caseChecked(caseACotee(1, 0,labyrintheCells, cellToCheck),arrayCellChecked)){
        cellsAround.push(caseACotee(1, 0,labyrintheCells, cellToCheck))
    } 
    if (!cellToCheck.walls[3] && !caseChecked(caseACotee(0, -1,labyrintheCells, cellToCheck),arrayCellChecked)){
        cellsAround.push(caseACotee(0, -1,labyrintheCells, cellToCheck))
    }
    return cellsAround
}

function DFS(labyrintheDFS){
    caseExit = labyrintheDFS.filter(function(element){
        return (element.exit)
    })
    caseEntrance = labyrintheDFS.filter(function(element){
        return (element.entrance === true)
    })

    antiInfiniteLOL = 0
    cellChecked = [caseEntrance[0]]
    actualCell = caseEntrance[0]
    stack = []

    console.log("entrance :",caseEntrance[0])
    console.log("exit :",caseExit[0])

    while (antiInfiniteLOL < 100 && actualCell!==caseExit[0]){
        let cellsAround = getCellsAround(labyrintheDFS, actualCell, cellChecked)
        cellsAround.forEach ((element) => {
            stack.push(element)
        })
        actualCell = stack[0]  // actualCell = stack[stack.length-1]
        cellChecked.push(actualCell)
        console.log("case actuelle :", actualCell, ", stack :", stack)
        stack.shift() // stack.pop()
        antiInfiniteLOL +=1
    }
    return cellChecked
}

lengthLaby = 5
exNum = "ex-0"
labyrinthe = labyrinthes[lengthLaby][exNum]
let path = DFS (labyrinthe)
console.log ('path :',path)

let MyLaby =  new LABYRINTHE (labyrinthe)
MyLaby.display()
console.log("entrance :", MyLaby.getEntrance(), ", exit :", MyLaby.getExit())
console.log(MyLaby) 
// console.log(getCellsAround(labyrinthe, labyrinthe[2], []),"cells autour de" ,labyrinthe[2])
// console.log(MultiPossiblity(labyrinthe[1]))
// console.log(caseACotee(1,0,labyrinthe, labyrinthe[0]))
// console.log(caseChecked(labyrinthe[0], [labyrinthe[0], labyrinthe[2],labyrinthe[1]]))