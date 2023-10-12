function createLaby(labyrinthe, lenght){
    labyrinthe.forEach( (element) => {
        $divTemporarire = $("<div>")
        $divTemporarire.attr("posX", element.posX)
        $divTemporarire.attr("posY", element.posY)
        $divTemporarire.addClass("case")
        if (element.walls[0]){
            $divTemporarire.addClass("borderTop")
        }
        if(element.walls[1]){
            $divTemporarire.addClass("borderRight")
        } 
        if(element.walls[2]){
            $divTemporarire.addClass("borderBottom")
        }
        if(element.walls[3]){
            $divTemporarire.addClass("borderLeft")
        }
        if(element.exit){
            $divTemporarire.addClass("green")
        }else if(element.entrance){
            $divTemporarire.addClass("yellow")
        } else {
            $divTemporarire.addClass("black")
        }
        $("#divCentrale").append($divTemporarire)
        }
    );
    $(".case").css("height",100/lenght+"%")
    $(".case").css("width",100/lenght+"%")
}


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

function arrayMultiAlreadyExist(caseActuel, arrayMulti){
    caseCheck = arrayMulti.filter(function(element){
        return (element[0] == caseActuel)
    })
    if (caseCheck.length == 1){
        return true
    } else {
        return false
    }
}

function multiPossiblity(caseActuel){
    let sumPossiblity = 0
    caseActuel.walls.forEach ((element) => {
        if (!element){
            sumPossiblity +=1
        } 
    })
    return sumPossiblity
}

function lastArrayElement(array){
    return array[array.lenght-1]
}


function getCellsAround(labyrintheCells, cellToCheck, path){
    let cellsAround =[]
    if(!cellToCheck.walls[0] && !caseChecked(caseACotee(-1,0,labyrintheCells, cellToCheck),path)){
        cellsAround.push(caseACotee(-1,0,labyrintheCells, cellToCheck))
    } 
    if (!cellToCheck.walls[1] && !caseChecked(caseACotee(0,1,labyrintheCells, cellToCheck),path)){
        cellsAround.push(caseACotee(0,1,labyrintheCells, cellToCheck))
    } 
    if (!cellToCheck.walls[2] && !caseChecked(caseACotee(1, 0,labyrintheCells, cellToCheck),path)){
        cellsAround.push(caseACotee(1, 0,labyrintheCells, cellToCheck))
    } 
    if (!cellToCheck.walls[3] && !caseChecked(caseACotee(0, -1,labyrintheCells, cellToCheck),path)){
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
    caseMultiPossiblity = []
    pathActual = [caseEntrance[0]]
    caseActual = caseEntrance[0]
    stack = []

    console.log("entrance :",caseEntrance[0])
    console.log("exit :",caseExit[0])

    while (antiInfiniteLOL < 100 && caseActual!==caseExit[0]){
        let cellsAround = getCellsAround(labyrintheDFS, caseActual, pathActual)
        cellsAround.forEach ((element) => {
            stack.push(element)
        })
        caseActual = stack[stack.length-1]
        pathActual.push(caseActual)
        stack.pop()
        console.log("case actuelle :", caseActual, ", stack :", stack)
        antiInfiniteLOL +=1
    }
    return pathActual
}

lengthLaby = 25
exNum = "ex-0"
labyrinthe = labyrinthes[lengthLaby][exNum]
createLaby(labyrinthe, lengthLaby);
let path = DFS (labyrinthe)
console.log ('path :',path)

console.log(getCellsAround(labyrinthe, labyrinthe[2], []),"cells autour de" ,labyrinthe[2])
// console.log(MultiPossiblity(labyrinthe[1]))
// console.log(caseACotee(1,0,labyrinthe, labyrinthe[0]))
// console.log(caseChecked(labyrinthe[0], [labyrinthe[0], labyrinthe[2],labyrinthe[1]]))