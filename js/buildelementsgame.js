
/*
class Other_Elements {
    constructor(id,timeout) {
        this.id = id;
        this.timeout = timeout;
        this.type = (Math.random() <= 0.5)? 0 : 1;
    }
}

    function begin(){
        createbackgroundGame();
        buildimages();
    }

/*
    function createbackgroundGame(){   
        var background = document.getElementById("backgroundgame");
            for(var i = 0; i < 961; i++){
                var div = document.createElement("div");
                    div.setAttribute("id",i);
                background.appendChild(div);
                div.addEventListener("click",buildSnake);
            }
    }

    function buildSnake(event){
        SIGN= (Math.random() < 0.5)? 0 : 1;
        INCREMENT = (Math.random() < 0.5)? 1 : 31;
        
        var i = parseInt(event.target.id);
            for(var j = 0; j < 4;j++){
                SNAKE.push(new Snake_Element(i,INCREMENT,SIGN));
                i = putBody(j);
            }
            drawSnake();
        setIntervals();
    }

    function drawSnake(){
        let urlimage,rotation;

        for(let i = 0; i < SNAKE.length; i++){
            if(i == 0)
                urlimage = "url(\"./img/Graphics/head.png\")";
            else if(i == SNAKE.length-1)
                urlimage = "url(\"./img/Graphics/tail.png\")"; 
            else {
                if(SNAKE[i].inc != SNAKE[i-1].inc)
                    urlimage = "url(\"./img/Graphics/bodycurvo.png\")";
                else
                    urlimage = "url(\"./img/Graphics/body.png\")";
            }
                if(i > 0 && SNAKE[i].inc != SNAKE[i-1].inc)
                    rotation = changerotation1(i);
                else
                    rotation = checkrotation(i);
            document.getElementById(SNAKE[i].id).style.backgroundImage = urlimage;
            document.getElementById(SNAKE[i].id).className = rotation;
        }
        return;
    }

    function invertisnake(){
        let rotation;
        for(let i = 0; i < SNAKE.length; i++){
            if(SNAKE[i].id == SNAKE[0].id)
                image = "url(\"./img/Graphics/head.png\")"; 
            else if(INDEX == i)
                image = "url(\"./img/Graphics/tail.png\")";
            else 
                image = "url(\"./img/Graphics/body.png\")";
                
            rotation = checkrotation(i);
            document.getElementById(SNAKE[i].id).className = rotation;
            document.getElementById(SNAKE[i].id).style.backgroundImage = image;
            }

            INDEX = (INDEX + 1) % SNAKE.length;
            if(SNAKE[SNAKE.length-1].sign == SNAKE[0].sign && SNAKE[0].inc == SNAKE[SNAKE.length-1].inc){
                SNAKE.forEach((elem) => {
                    elem.inversione = 0;
                });
            }
    }
    
    function checkrotation(i){
        let rotation;
            if(SNAKE[i].inc == 1){
                if(SNAKE[i].sign == 1)
                    rotation = "rotate270";
                else
                    rotation = "rotate90";
            }else{
                if(SNAKE[i].sign == 0)
                    rotation = "rotate180";
                else
                    rotation = ""; 
            }
        return rotation;
    }

    function changerotation1(i){
        if(i < SNAKE.length-1){
            if((SNAKE[i].inc == 1 && SNAKE[i].sign == 0 && SNAKE[i-1].sign == 0) ||
                (SNAKE[i].inc == 31 && SNAKE[i].sign == 1 && SNAKE[i-1].sign == 1))
                    return "rotate180";
            else if((SNAKE[i].inc == 1 && SNAKE[i].sign == 1 && SNAKE[i-1].sign == 1) ||
                (SNAKE[i].inc == 31 && SNAKE[i].sign == 0 && SNAKE[i-1].sign == 0))
                    return "";
                else {
                        if(SNAKE[i-1].sign == 0 && SNAKE[i].sign == 1)
                            return "rotate90";
                        else if(SNAKE[i-1].sign == 1 && SNAKE[i].sign == 0)
                            return "rotate270";
                }
            }else{
                if(SNAKE[i].inc == 1){
                    if(SNAKE[i].sign == 0)
                        return "";
                    else
                        return "rotate180";
                }else{
                    if(SNAKE[i].sign == 0)
                        return "rotate90";
                    else
                     return "rotate270";
                } 
            }
        }

    function putBody(j){
        let i = SNAKE[j].id;
        const newid = newId(i,j,0);
        if(i == newid){
            if(SNAKE[j].sign == 1)
                return SNAKE[j].id + SNAKE[j].inc;
            else
                return SNAKE[j].id - SNAKE[j].inc;
        }else
            return newid;
    }

function newId(i,j,k){
    if(SNAKE[j].inc == 31){
        if((i - SNAKE[j].inc) < 0){
            if((SNAKE[j].sign == 0 && k == 0) || (SNAKE[j].sign == 1 && k == 1))
                return SNAKE[j].id + 930;
        }
        if((i + SNAKE[j].inc) > 960){
            if((k == 0 && SNAKE[j].sign == 1) || (SNAKE[j].sign == 0 && k == 1))
                return SNAKE[j].id - 930;
        }
    }

    if(SNAKE[j].inc == 1){
        if((i + SNAKE[j].inc) % 31 == 0){
            if((k == 0 && SNAKE[j].sign == 1 && j == 0) || (k == 1 && SNAKE[j].sign == 0))
                return SNAKE[j].id - 30;
        }
        
        if(i % 31 == 0){
            if((k == 0 && SNAKE[j].sign == 0) || (k == 1 && SNAKE[j].sign == 1 && (SNAKE[1].id + 1) % 31 > 0))
                return SNAKE[j].id + 30;
        }
    }
    return i;
}

function setIntervals(){
    for(let i = 0; i < 961; i++)
        document.getElementById(i).removeEventListener("click",buildSnake);
    
    document.addEventListener("keydown",changedirection);
    document.addEventListener("keydown",speed);
    SNAKEMOVEMENT = setInterval(movesnake,MOVEINTERVAL);
    BORDERINTERVAL = setInterval(addborder,INTERVALADD);
    ADDINTERVAL = setInterval(addFoodOrBomb,2000);
}


function getColour(){
    let colourarray = ["orange", "purple", "yellow", "black", "blue"];
    let index = Math.floor(Math.random() * 4);
    return colourarray[index];
}

function buildimages(){
    let colourchoices = document.getElementById("colourchoices");
    let colours = colourchoices.getElementsByTagName("div");
    for(let i = 0; i < colours.length; i++){
        let boximage = document.getElementById(colours[i].id);
        let img = document.createElement("img");
            img.src = "./img/Graphics/Choices/"+boximage.id+".png";
        boximage.appendChild(img);
        boximage.addEventListener("click",changesnakecolour);
    }
}
}

*/