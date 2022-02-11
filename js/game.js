class Game {
    constructor() {
        this.event = new Array();
        this.timeout = new Array();
        this.intervals = new Array();
        this.otherelem = new Array();
        this.snake = new Snake();
        this.sign = (Math.random() < 0.5) ? 0 : 1;
        this.inc = (Math.random() < 0.5) ? 1 : 31;
    }

    createbackgroundGame() {
        this.event.push(this.buildSnake.bind(this));
        var background = document.getElementById("backgroundgame");
        for (var i = 0; i < 961; i++) {
            var div = document.createElement("div");
            div.setAttribute("id", i);
            background.appendChild(div);
            div.addEventListener("click", this.event[0]);
        }
    }

    buildSnake(event) {
        var id = parseInt(event.target.id);
        for (var j = 0; j < 4; j++) {
            this.snake.addSnakeElement(id,j);
            this.snake.giveElem(j).sign = this.sign;
            this.snake.giveElem(j).inc = this.inc;
            id = this.snake.generateNewIdForInsert();
        }
        this.snake.drawSnake();
        this.setIntervals();
    }

    setIntervals() {
        for (let i = 0; i < 961; i++)
            document.getElementById(i).removeEventListener("click", this.event[0]);
        this.event.pop();
        this.event.push(this.changedirection.bind(this));
        this.event.push(this.moreSpeed.bind(this));
        document.addEventListener("keydown", this.event[0]);
        document.addEventListener("keydown", this.event[1]);

        this.intervals.push(new Timing(this.intervals.length, setInterval(this.movesnake.bind(this), 100), 100));
        this.intervals.push(new Timing(this.intervals.length, setInterval(this.addborder.bind(this), 6000), 6000));
        this.intervals.push(new Timing(this.intervals.length, setInterval(this.addFoodOrBomb.bind(this), 2000), 2000));
    }

    movesnake(){
        document.getElementById(this.snake.giveTail().id).style.backgroundImage = "";

        for (let i = this.snake.giveLength() - 1; i > 0; i--) {

            let current = this.snake.giveElem(i);
            let previous = this.snake.giveElem(i - 1);

            document.getElementById(current.id).className = "";
            current.inc = previous.inc;
            current.sign = previous.sign;
            current.id = previous.id;
        }

        this.snake.giveHead().inc = this.inc;
        this.snake.giveHead().sign = this.sign;
        document.getElementById(this.snake.giveHead().id).className = "";
        this.snake.updateheadposition();

        if (this.snake.inversione == 1)
            this.snake.invertisnake();
        else
            this.snake.drawSnake();

        if (document.getElementById("backgroundgame").className == "withborder") {
            if (this.checkifloose())
                return;
        }

        if (this.snake.giveLength() > 15) {
            this.intervals[0].clearInt();
            this.intervals[0].value = 60;
            this.intervals[0].int = setInterval(this.movesnake.bind(this), this.intervals[0].value);
        }
        this.checkifeat();
    }

    addborder() {
        document.getElementById("backgroundgame").removeAttribute("class","noborder");
        document.getElementById("backgroundgame").setAttribute("class", "withborder");
        this.timeout.push(setTimeout(this.deleteborder.bind(this), this.intervals[1].value));
    }

    deleteborder() {
        document.getElementById("backgroundgame").removeAttribute("class", "withborder");
        document.getElementById("backgroundgame").setAttribute("class", "noborder");
        if (this.intervals[1].int != null) {
            clearInterval(this.intervals[1].int);
            this.intervals[1].int = setInterval(this.addborder.bind(this), this.intervals[1].value);
        }
        --this.intervals[1].value;
    }

    addFoodOrBomb() {
        let x = Math.floor(Math.random() * 960);

        if(document.getElementById(x).style.backgroundImage || document.getElementById(x).style.backgroundImage != "")
            return;

        for (let i of this.otherelem) {
            if (i.id == x)
                return;
        }

        for (let i of this.snake.body) {
            if (i.id == x)
                return;
        }

        var newelem = new OtherElements(x, this.otherelem.length);
        this.otherelem.push(newelem);
        newelem.timer = setTimeout(this.deleteFromPlayground.bind(this), newelem.timeout, newelem);
        newelem.drawElem();
    }

    deleteFromPlayground(newelem){
        newelem.deleteElem();
        setTimeout(this.otherelem.splice(),100, newelem.position, 1);
        console.log(this.otherelem);
    }

    checkifeat() {
        for (let i of this.otherelem) {
            if (i.id == this.snake.giveHead().id) {
                if (i.type == 0) {
                    this.snake.addSnakeElement(this.snake.generateNewIdForInsert(), this.snake.giveLength());
                    this.snake.giveTail().sign = this.sign;
                    this.snake.giveTail().inc = this.inc;
                    this.snake.drawSnake();
                    console.log(this.snake);
                }else{
                    document.getElementById(i.id).style.backgroundImage = "url(\"./img/explosion.png\")";
                    setTimeout(this.snake.drawSnake.bind(this.snake),800);
                    let lastelem = this.snake.giveTail();
                    document.getElementById(lastelem.id).style.backgroundImage = "";
                    this.snake.body.pop();
                    console.log(this.snake);
                }

                this.otherelem.splice(i.position, 1);
                if (this.snake.giveLength() == 0) {
                    console.log("Hai perso");
                    this.endgame();
                    return;
                }
            }
        }
    }

    endgame() {
        for (let i of this.intervals)
            i.clearInt();
        this.intervals = null;

        for(let i of this.timeout)
            clearTimeout(i);

        this.timeout = null;

        document.removeEventListener("keydown", this.event[0]);
        document.removeEventListener("keydown", this.event[1]);
        this.event = null;
        return;
    }

    changedirection(event) {
        if (event.keyCode == 38) {
            this.inc = 31;
            this.sign = 1;
        }
        else if (event.keyCode == 40) {
            this.inc = 31;
            this.sign = 0;
        }
        else if (event.keyCode == 39) {
            this.inc = 1;
            this.sign = 0;
        }
        else if (event.keyCode == 37) {
            this.inc = 1;
            this.sign = 1;
        }

        if (this.snake.giveHead().sign != this.sign && this.inc == this.snake.giveHead().inc)
            this.snake.inversione = 1;
    }

    moreSpeed(event) {
        if(event.keyCode == 32) {
            this.intervals[0].clearInt();
            this.intervals[0].int = setInterval(this.movesnake.bind(this), 20);
            this.timeout.push(setTimeout(this.clearSnakeMovement.bind(this), 100));
        }
    }

    clearSnakeMovement(){
        this.intervals[0].clearInt();
        this.intervals[0].int = setInterval(this.movesnake.bind(this), 100);
        this.timeout.pop();
    }

    checkifloose() {
        for (let i of this.snake.body) {
            if (i.checkIfTouchBorder()) {
                this.endgame();
                return true;
            }
        }
    }

    buildimages() {
        let colourchoices = document.getElementById("colourchoices");
        let colours = colourchoices.getElementsByTagName("div");
        for (let i = 0; i < colours.length; i++) {
            let boximage = document.getElementById(colours[i].id);
            let img = document.createElement("img");
            img.src = "./img/Graphics/Choices/" + boximage.id + ".png";
            img.id = boximage.id;
            boximage.id = boximage.id+"box";
            boximage.appendChild(img);
            img.addEventListener("click", this.changesnakecolour.bind(this));
        }
    }

    changesnakecolour(event) {
        this.snake.colour = event.target.id;
    }

}
