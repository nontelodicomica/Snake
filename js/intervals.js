class Timing {
    constructor(id, int, value) {
        this.id = id;
        this.int = int;
        this.value = value;
    }
    
    clearInt() {
        clearInterval(this.int);
        this.int = null;
    }
}