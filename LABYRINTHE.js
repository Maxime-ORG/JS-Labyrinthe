class LABYRINTHE{
    cells = [];

    constructor(labyrinthe) {
        labyrinthe.forEach(element => {
            this.cells.push(new CELL(element.posX, element.posY, element.walls, element.entrance, element.exit));
        });
    };

    display(){
        this.cells.forEach((element) => {
            let $divTemporarire = $("<div>")
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
        });
        $(".case").css("height",100/Math.sqrt(this.cells.length)+"%")
        $(".case").css("width",100/Math.sqrt(this.cells.length)+"%")
    }

    getEntrance(){
        return caseEntrance = this.cells.filter(function(element){
            return (element.entrance === true)
        })
    }

    getExit(){
        return caseExit = this.cells.filter(function(element){
            return (element.exit === true)
        })
    }
}
  
