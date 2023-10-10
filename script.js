function createLaby(lenght, ex){
    labyrinthes[lenght][ex].forEach( (element) => {
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
        console.log("la div ", element)
        }
    );
    $(".case").css("height",100/lenght+"%")
    $(".case").css("width",100/lenght+"%")
}

function DFS(lenght, ex){
    labyrinthes[lenght][ex]
}

let path = DFS (0,0)
createLaby(5,"ex-0");
console.log (path)