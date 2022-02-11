class Snake {
    constructor() {
        this.body = new Array();
        this.inversione = 0;
        this.indexelemcovered = 1;
        this.speed = setInterval(this.incSpeed, 20000);
        this.colour = this.getColour();
    }

    giveElem(index) {
        return this.body[index];
    }

    giveLength() {
        return this.body.length;
    }

    giveTail() {
        let lastindex = this.giveLength() - 1
        return this.giveElem(lastindex);
    }

    giveHead() {
        return this.giveElem(0);
    }

    addSnakeElement(id, position) {
        this.body.push(new Snake_Element(id, position));
    }

    incSpeed() {
        if (this.speed >= 30)
            --this.speed;
        else {
            clearInterval(this.speed);
            this.speed = 100;
        }
    }

    drawSnake() {
        let image, rotation;

        for (let i of this.body) {
            let previous = this.body[i.position - 1];

            if (i.position == 0)
                image = "head";
            else if (i.position == this.body.length - 1)
                image = "tail";
            else{
                if(i.inc != previous.inc)
                    image = "bodycurvo";
                else
                    image = "body";
            }

            if (i.position > 0 && i.inc != previous.inc)
                rotation = i.changerotation(previous, this.giveLength());
            else
                rotation = i.checkstartrotation();
            document.getElementById(i.id).style.backgroundImage = "url(\"./img/Graphics/" + this.colour + "/"+ image + this.colour + ".png\")";
            document.getElementById(i.id).className = rotation;
        }
    }

    generateNewIdForInsert() {
        let lastelem = this.giveTail();
        let newid = lastelem.newId(0, null);
        if (lastelem.id == newid) {
            if (lastelem.sign == 1)
                return lastelem.id + lastelem.inc;

            else
                return lastelem.id - lastelem.inc;
        }
        else
            return newid;
    }

    getColour() {
        let colourarray = ["orange", "purple", "yellow", "black", "blue"];
        let index = Math.floor(Math.random() * 4);
        return colourarray[index];
    }

    invertisnake() {
        let rotation, image;
        let idhead = this.body[0].id;

        for (let i of this.body) {
            if (i.id == idhead)
                image = "head";
            else if (this.indexelemcovered == i.id)
                image = "tail";
            else
                image = "body";

            this.indexelemcovered = (this.indexelemcovered + 1) % this.body.length;
            rotation = i.checkstartrotation();
            document.getElementById(i.id).className = rotation;
            document.getElementById(i.id).style.backgroundImage = "url(\"./img/Graphics/" + this.colour + "/" + image + this.colour + ".png\")";
        }

        if (this.checkendinversion()){
            this.inversione = 0;
            document.getElementById(this.giveTail().id).style.backgroundImage = "url(\"./img/Graphics/" + this.colour + "/tail" + this.colour + ".png\")";
        }
    }

    checkendinversion() {
        let tail = this.giveTail();
        let head = this.giveHead();

        if (tail.sign == head.sign)
            return true;

        else
            return false;
    }
    
    updateheadposition() {
        let head = this.giveHead();
        let oldid = head.id;
        let newid = head.newId(1, this.giveElem(1));
        if (oldid == newid) {
            if (head.sign == 1)
                head.id -= head.inc;

            else
                head.id += head.inc;
        }
        else
            head.id = newid;
    }
}
