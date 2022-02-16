class OtherElements {
    constructor(id) {
        this.id = id;
        this.timeout = this.generateTimeoutValue();
        this.timer = null;
        this.type = (Math.random() <= 0.5)? 0 : 1;
    }

    generateTimeoutValue(){
        let newtimeout = Math.floor(Math.random()*100)*200;
        if(newtimeout < 500)
            return 2000;
        else
            return newtimeout;
    }

    deleteElem(){
        this.deleteTimeoutExplosion();
        if(this.type == 1){
            document.getElementById(this.id).style.backgroundImage = "url(\"./img/explosion.png\")";
            setTimeout(this.deleteElemFromGame.bind(this),100);
        }else
            this.deleteElemFromGame();
    }
    
    deleteTimeoutExplosion(){
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