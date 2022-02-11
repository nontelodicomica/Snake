function Snake(){
        this.body = new Array();
        this.inversione = 0;
        this.indexelemcovered = 1;
        this.speed = setInterval(this.incSpeed,20000);
        this.colour = this.getColour();
    }
}

Snake.prototype.giveElem = function(index){
        return this.body[index];
    }

Snake.prototype.giveLength = function(){
        return this.body.length;
    }

Snake.prototype.giveTail = function(){
        return this.giveElem(this.giveLength-1);
    }

Snake.prototype.giveHead = function(){
        return this.giveElem(0);
    }

Snake.prototype.addSnakeElement = function(id,position){
        console.log(this.snake);
        this.body.push(new Snake_Element(id,position));
    }

Snake.prototype.incSpeed = function(){
        if(this.speed >= 30)
            --this.speed;
        else{
            clearInterval(this.speed);
            this.speed = 100;
        }
    }

Snake.prototype.drawSnake = function(){
        let image,rotation;

        for(let i of this.body){
            let previous = this.body[i.position-1];

            if(i.position == 0)
                image = "head";
            else if(i.position == this.body.length-1)
                image = "tail";
            else {
                if(i.inc != previous.inc)
                    image = "bodycurvo";
                else
                    image = "body";
            }
                if(i.position > 0 && i.inc != i.inc)
                    rotation = i.changerotation(previous,this.giveLength());
                else
                    rotation = i.checkstartrotation();
            document.getElementById(i.id).style.backgroundImage = "url(\"./img/Graphics/"+image+this.colour+".png\")";
            document.getElementById(i.id).className = rotation;
        }
    }

Snake.prototype.generateNewIdForInsert = function(){
        let lastelem = this.giveTail();
        let newid = lastelem.newId(0,null);
        if(lastelem.id == newid){
            if(lastelem.sign == 1)
                return lastelem.id + lastelem.inc;
            else
                return lastelem.id - lastelem.inc;
        }else
            return newid;
    }

Snake.prototype.getColour = function(){
        let colourarray = ["orange", "purple", "yellow", "black", "blue"];
        let index = Math.floor(Math.random() * 4);
        return colourarray[index];
    }

Snake.prototype.invertisnake = function(){
        let rotation,image;
        let idhead = this.body[0].id;

        for(let i of this.body){
            if(i.id == idhead)
                image = "head"; 
            else if(this.indexelemcovered == i.id)
                image = "tail";
            else 
                image = "body";
                
            rotation = checkstartrotation(i);
            document.getElementById(i).className = rotation;
            document.getElementById(i).style.backgroundImage = "url(\"./img/Graphics/"+this.colour+"/"+image+this.colour+".png\")";
            }

            this.indexelemcovered = (this.indexelemcovered + 1) % this.body.length;
            if(checkendinversion())
                this.inversione = 0;
    }

Snake.prototype.checkendinversion = function(){
        let tail = this.giveTail();
        let head = this.giveHead();

        if(tail.sign == head.sign)
            return true;
        else
            return false;
    }

Snake.prototype.changesnakecolour = function(event){
            this.colour = event.target.id;
}

Snake.prototype.updateheadposition = function(){
        let head = this.giveHead();
        let oldid = head.id;
        let newid = head.newId(1,this.giveElem(1));
            if(oldid == newid){
                if(head.sign == 1)
                    head.id -= head.inc;
                else
                    head.id += head.inc;
            }else
                head.id = newid;
}