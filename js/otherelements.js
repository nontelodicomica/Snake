class OtherElements {
    constructor(id, pos) {
        this.id = id;
        this.position = pos;
        this.timeout = Math.floor(Math.random()*100)*200;
        this.timer = 
        this.type = (Math.random() <= 0.5)? 0 : 1;
    }

    deleteElem(){
        if(this.type == 1){
            document.getElementById(this.id).style.backgroundImage = "url(\"./img/explosion.png\")";
            setTimeout(this.deleteElemFromGame.bind(this),100);
        }else
            document.getElementById(this.id).style.backgroundImage = "";
            clearTimeout(this.timer);
            this.timer = null;
        }
    
    deleteElemFromGame(){
        document.getElementById(this.id).style.backgroundImage = "";
    }

    drawElem(){
        let image;
            if(this.type == 0)
                image = "apple";
            else
                image = "bomb";

            document.getElementById(this.id).style.backgroundImage = "url(\"./img/"+image+".png\")";
    }
}