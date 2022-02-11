class Timing{
    constructor(id, int, value){
        this.id = id;
        this.int = int;
        this.value = value;
    }
}

Timing.prototype.clearInt = function(){
        clearInterval(this.int);
        this.int = null;
    }