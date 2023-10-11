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
        return (element.posX == x + directionX && element.posY == y + directionY)
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
    return array[array.lenght]
}


function DFS(labyrinthe){
    caseExit = labyrinthe.filter(function(element){
        return (element.exit)
    })
    caseEntrance = labyrinthe.filter(function(element){
        return (element.entrance)
    })

    antiInfiniteLOL = 0
    caseMultiPossiblity = []
    pathActual = [caseEntrance[0]]

    console.log("entrance :",caseEntrance[0])
    console.log("exit :",caseExit[0])

    while (antiInfiniteLOL < 100 && pathActual[pathActual.length-1]!==caseExit[0]){
        
        //console.log("entrée dans la boucle",pathActual)
        if(!pathActual[pathActual.length-1].walls[0] && !caseChecked(caseACotee(-1,0,labyrinthe, pathActual[pathActual.length-1]),pathActual)){
            pathActual.push(caseACotee(-1,0,labyrinthe, pathActual[pathActual.length-1]))
            console.log ('HAUT, case courante après mouvement:',pathActual[pathActual.length-1])
        } else if(!pathActual[pathActual.length-1].walls[1] && !caseChecked(caseACotee(0,1,labyrinthe, pathActual[pathActual.length-1]),pathActual) ){
            pathActual.push(caseACotee(0,1,labyrinthe, pathActual[pathActual.length-1]))
            console.log ('DROITE, case courante après mouvement:',pathActual[pathActual.length-1])
        } else if(!pathActual[pathActual.length-1].walls[2] && !caseChecked(caseACotee(1,0,labyrinthe, pathActual[pathActual.length-1]),pathActual) ){
            pathActual.push(caseACotee(1,0,labyrinthe, pathActual[pathActual.length-1]))
            console.log ('BAS, case courante après mouvement:',pathActual[pathActual.length-1])
        } else if(!pathActual[pathActual.length-1].walls[3] && !caseChecked(caseACotee(0,-1,labyrinthe, pathActual[pathActual.length-1]),pathActual) ){
            pathActual.push(caseACotee(0,-1,labyrinthe, pathActual[pathActual.length-1]))
            console.log ('GAUCHE, case courante après mouvement:',pathActual[pathActual.length-1])
        } else {
            if (caseMultiPossiblity[caseMultiPossiblity.length-1][1]>2){
                pathActual.push(caseMultiPossiblity[caseMultiPossiblity.length-1][0])
                caseMultiPossiblity[caseMultiPossiblity.length-1][1] -= 1
            } else {
                console.log('ma case à pop :', caseMultiPossiblity[caseMultiPossiblity.length-1])
                caseMultiPossiblity.pop()
            }
            console.log ("HAHA T'ES COINCE, téléportation en :", pathActual[pathActual.length-1])
            console.log("case multi :",caseMultiPossiblity)
        }
        if(multiPossiblity(pathActual[pathActual.length-1]) > 2 && !arrayMultiAlreadyExist(pathActual[pathActual.length-1],caseMultiPossiblity)){
            caseMultiPossiblity.push([pathActual[pathActual.length-1], multiPossiblity(pathActual[pathActual.length-1])])
        }

        antiInfiniteLOL +=1
    }
    return pathActual
}

lengthLaby = 5
exNum = "ex-0"
labyrinthe = labyrinthes[lengthLaby][exNum]
createLaby(labyrinthe, lengthLaby);
let path = DFS (labyrinthe)

console.log ('path :',path)

// console.log(MultiPossiblity(labyrinthe[1]))
// console.log(caseACotee(1,0,labyrinthe, labyrinthe[0]))
// console.log(caseChecked(labyrinthe[0], [labyrinthe[0], labyrinthe[2],labyrinthe[1]]))