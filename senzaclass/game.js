function Game(){
        this.snake = new Snake();
        this.intervals = [];
        this.otherelem = [];
        this.sign = (Math.random() < 0.5)? 0 : 1;
        this.inc = (Math.random() < 0.5)? 1 : 31;
}

Game.prototype.createbackgroundGame = function(){   
        var background = document.getElementById("backgroundgame");
            for(var i = 0; i < 961; i++){
                var div = document.createElement("div");
                    div.setAttribute("id",i);
                background.appendChild(div);
                div.addEventListener("click",this.buildSnake.bind(this));
        }
    }

Game.prototype.buildSnake = function(event){
    var id = parseInt(event.target.id);
    console.log(this.snake);
        for(var j = 0; j < 4; j++){
            this.snake.addSnakeElement();
            this.snake.giveElem(j).sign = this.sign;
            this.snake.giveElem(j).inc = this.inc;
            id = this.snake.generateNewIdForInsert();
        }
    this.snake.drawSnake();
}

Game.prototype.setIntervals = function(){
        for(let i = 0; i < 961; i++)
            document.getElementById(i).removeEventListener("click",this.buildSnake);
        
        document.addEventListener("keydown",this.changedirection);
        document.addEventListener("keydown",this.moreSpeed);
        let length = this.intervals.length;
        this.intervals.push(new Timing(length,setInterval(this.movesnake,100),100));
        this.intervals.push(new Timing(length,setInterval(this.addborder,6000),6000));
        this.intervals.push(new Timing(length,setInterval(this.addFoodOrBomb,2000),2000));
    }

Game.prototype.addborder = function(){
        document.getElementById("backgroundgame").removeAttribute("class","noborder");
        document.getElementById("backgroundgame").setAttribute("class","withborder");
        setTimeout(this.deleteborder,this.intervals[1].value);
    }

Game.prototype.deleteborder = function(){
        document.getElementById("backgroundgame").removeAttribute("class","withborder");
        document.getElementById("backgroundgame").setAttribute("class","noborder");
            if(this.intervals[1].int !== null){
                clearInterval(this.intervals[1].int);               
                this.intervals[1].int = setInterval(this.addborder,this.intervals[1].value);
            }
        this.intervals[1].value--;
    }

Game.prototype.addFoodOrBomb = function(){
        let x = Math.floor(Math.random()*960);
    
        if(document.getElementById(x).style.backgroundImage || document.getElementById(x).style.backgroundImage != "")
            return;
    
            for(let i of this.otherelem){
                if(i.id == x)
                    return;
            }
    
            for(let i of this.snake.body){
                if(i.id == x)
                    return;
            }
    
            let newelem = new OtherElements(x,this.otherelem.length);
            this.otherelem.push(newelem);
            newelem.timer = setTimeout( function(){
                newelem.deleteElem();
                this.otherelem.splice(newelem.position,1);
            },newelem.timeout);
            newelem.drawElem();
    }
     
Game.prototype.movesnake = function(){ 
        document.getElementById(this.snake.giveTail().id).style.backgroundImage = "";
        for(let i = this.snake.giveLength()-1; i > 0; i--){

            let current = this.snake.giveElem(i);
            let previous = this.snake.giveElem(i-1);

            document.getElementById(current.id).className = "";
                current.inc = previous.inc;
                current.inversione = previous.inversione;
                current.sign = previous.sign;
                current.id = previous.id;
        }
            this.snake.giveHead().inc = this.inc;
            this.snake.giveHead().sign = this.sign;
            document.getElementById(this.snake.giveHead().id).className = "";
            this.snake.updateheadposition();
    
            if(this.inversione == 1)
                invertisnake();
            else
                this.snake.drawSnake();
            
            if(document.getElementById("backgroundgame").className == "withborder"){
                if(this.checkifloose())
                    return;
            }
            
            if(this.giveLength() > 15){
                this.intervals[0].clearInt();
                this.intervals[0].value = 60;
                this.intervals[0].int = setInterval(this.movesnake, this.intervals[0].value);
            }
            this.checkifeat();
    }

Game.prototype.checkifeat = function(){
        for(let i of this.otherelem){
            if(i.id == this.snake.giveHead().id){
                if(i.type == 0){
                    this.addSnakeElement(this.snake.generateNewIdForInsert(),this.snake.giveLength());
                    this.snake.giveTail().sign = this.sign;
                    this.snake.giveTail().inc = this.inc;
                }else{
                    let lastelem = this.snake.giveTail();
                    document.getElementById(lastelem.id).style.backgroundImage = "";
                    this.snake.body.pop();
                }
                this.snake.drawSnake();
                i.deleteElem();
                this.otherelem.splice(i.position,1);
                if(this.snake.giveLength() == 0){
                    console.log("Hai perso");
                    this.endgame();
                }

            }
        }
    }

Game.prototype.endgame = function(){
        for(let i of this.intervals){
            i.clearInt();
        }
        this.intervals = null;
        document.removeEventListener("keydown",this.changedirection);
        document.removeEventListener("keydown",this.moreSpeed);
    }

Game.prototype.changedirection = function(event){
        if(event.keyCode == 38){
            this.inc = 31;
            this.sign = 1;
        }
        else if(event.keyCode == 40){
            this.inc = 31;
            this.sign = 0;
        }
        else if(event.keyCode == 39){
            this.inc = 1;
            this.sign = 0;
        }
        else if(event.keyCode == 37){
            this.inc = 1;
            this.sign = 1;
        }

        if(this.snake.giveHead().sign != this.sign && this.inc == this.snake.giveHead().inc)
            this.inversione = 1;
    }

Game.prototype.moreSpeed = function(event){
        if(event.keyCode == 32){
            this.intervals[0].clearInt();
            this.intervals[0].int = setInterval(movesnake,20);
            setTimeout(function(){
                this.intervals[0].clearInt();
                this.intervals[0].int = setInterval(movesnake,this.speed);
            },200);
        }
    }

Game.prototype.checkifloose = function(){
        for(let i of this.snake.body){
            if(i.checkIfTouchBorder()){
                this.endgame();
                return true;
            }
        }
    }

Game.prototype.buildimages = function(){
        let colourchoices = document.getElementById("colourchoices");
        let colours = colourchoices.getElementsByTagName("div");
        for(let i = 0; i < colours.length; i++){
            let boximage = document.getElementById(colours[i].id);
            let img = document.createElement("img");
                img.src = "./img/Graphics/Choices/"+boximage.id+".png";
            boximage.appendChild(img);
            boximage.addEventListener("click",this.changesnakecolour);
        }
    }

    /*
function checkborder(i){
    if(SNAKE[i].inc == 1){
        if((SNAKE[i].id+1) % 31 == 0 || SNAKE[i].id % 31 == 0)
            return true;
        }else{
            if(SNAKE[i].id + SNAKE[i].inc > 960 || SNAKE[i].id - SNAKE[i].inc < 0)
                return true;
        }
    return false;
}

function checkifloose(){
    for(let i = 0; i < SNAKE.length; i++){
        if(checkborder(i)){
            endgame();
            return true;
        }
    }
}

function movesnake(){ 
    document.getElementById(SNAKE[SNAKE.length-1].id).style.backgroundImage = "";
    for(let i = SNAKE.length-1; i > 0; i--){
            document.getElementById(SNAKE[i].id).className = "";
            SNAKE[i].inc = SNAKE[i-1].inc;
            SNAKE[i].inversione = SNAKE[i-1].inversione;
            SNAKE[i].sign = SNAKE[i-1].sign;
            SNAKE[i].id = SNAKE[i-1].id;
    }
        SNAKE[0].inc = INCREMENT;
        SNAKE[0].sign = SIGN;
        document.getElementById(SNAKE[0].id).className = "";
        updateheadposition();

        if(SNAKE[0].inversione == 1)
            invertisnake();
        else
            drawSnake();
        
        if(document.getElementById("backgroundgame").className == "withborder"){
            if(checkifloose())
            return;
        }
        
        if(SNAKE.length > 15){
            clearInterval(SNAKEMOVEMENT);
            MOVEINTERVAL = 60;
            SNAKEMOVEMENT = setInterval(movesnake,MOVEINTERVAL);
        }
        checkifeat();
}
function checkifeat(){
    let lastindex = SNAKE.length - 1;
    
    OTHER_ELEMENTS.forEach((elem) =>{
        let index = OTHER_ELEMENTS.indexOf(elem);

        if(SNAKE[0].id == elem.id){
            if(elem.type == 0)
                SNAKE.push(new Snake_Element(putBody(lastindex),SNAKE[lastindex].inc,SNAKE[lastindex].sign));
            else{
                document.getElementById(elem.id).style.backgroundImage = "";
                SNAKE.pop();
            }
            drawSnake();
            clearTimeout(OTHER_ELEMENTS[index].timeout);
            OTHER_ELEMENTS.splice(index,1);

            if(SNAKE.length == 0){
                console.log("Hai perso");
                endgame();
            }
            }
    });
}*/
/*
function speed(event){
    if(event.keyCode == 32){
        clearInterval(SNAKEMOVEMENT);
        SNAKEMOVEMENT = setInterval(movesnake,20);
        setTimeout(function(){
            clearInterval(SNAKEMOVEMENT);
            SNAKEMOVEMENT = setInterval(movesnake,MOVEINTERVAL);
        },200);
    }
}

function changedirection(event){
        if(event.keyCode == 38){
            INCREMENT = 31;
            SIGN = 1;
        }
        else if(event.keyCode == 40){
            INCREMENT = 31;
            SIGN = 0;
        }
        else if(event.keyCode == 39){
            INCREMENT = 1;
            SIGN = 0;
        }
        else if(event.keyCode == 37){
            INCREMENT = 1;
            SIGN = 1;
        }

        if(SNAKE[0].sign != SIGN && INCREMENT == SNAKE[0].inc){
            SNAKE.forEach((elem) => {
                elem.inversione = 1;
            });
        }
}

function addFoodOrBomb(){
    let x = Math.floor(Math.random()*960);

    if(document.getElementById(x).style.backgroundImage || document.getElementById(x).style.backgroundImage != "")
        return;

        OTHER_ELEMENTS.forEach((elem) => {
            if(elem.id == x)
                return;
        });

        SNAKE.forEach((snakeelem) => {
            if(x == snakeelem)
                return;
        });

        let endinterval = Math.floor(Math.random()*100)*200;

        let newtimeout = setTimeout(function(){
                document.getElementById(newelem.id).style.backgroundImage = "";
                document.getElementById(newelem.id).style.backgroundColor = "";

                let index = OTHER_ELEMENTS.indexOf(newelem);
                OTHER_ELEMENTS.splice(index,1);
            },endinterval);
        
        const newelem = new Other_Elements(x,newtimeout);
        if(newelem.type == 0)
            document.getElementById(newelem.id).style.backgroundImage = "url(\"./img/Graphics/apple.png\")";
        else
            document.getElementById(newelem.id).style.backgroundColor = "purple";

        OTHER_ELEMENTS.push(newelem);
}
*/
