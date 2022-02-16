class Snake_Element {
    constructor(id, pos) {
        this.position = pos;
        this.id = id;
        this.inc = 0;
        this.sign = 0;
    }
    
    checkstartrotation() {
        if (this.inc == 1) {
            if (this.sign == 1)
                return "rotate270";

            else
                return "rotate90";
        } else {
            if (this.sign == 0)
                return "rotate180";

            else
                return "";
        }
    }

    newId(insormove, next) {
        if (this.inc == 31) {
            if ((this.id - this.inc) < 0) {
                if (this.sign == insormove)
                    return this.id + 930;
            }
            if ((this.id + this.inc) > 960) {
                if (this.sign != insormove)
                    return this.id - 930;
            }
        }

        if (this.inc == 1) {
            if ((this.id + this.inc) % 31 == 0) {
                if ((insormove == 0 && this.sign == 1 && this.position == 0) || (insormove == 1 && this.sign == 0))
                    return this.id - 30;
            }

            if (this.id % 31 == 0) {
                if ((insormove == 0 && this.sign == 0) || (next != null && insormove == 1 && this.sign == 1 && (next.id + 1) % 31 > 0))
                    return this.id + 30;
            }
        }
        return this.id;
    }

    changerotation(previous, snakelength) {
        if((this.inc == 1 && this.sign == 0 && previous.sign == 0) ||
            (this.inc == 31 && this.sign == 1 && previous.sign == 1)){
                if (this.position < snakelength - 1 || this.inc == 1)
                    return "rotate180";
                else 
                    return "rotate270";
        }else if((this.inc == 1 && this.sign == 1 && previous.sign == 1) ||
                (this.inc == 31 && this.sign == 0 && previous.sign == 0))
                if(this.position < snakelength - 1 || this.inc == 1)
                    return "";
                else
                    return "rotate90";
                else {
                        if(previous.sign == 0 && this.sign == 1){
                            if(this.position < snakelength - 1 || this.inc == 31)
                                return "rotate90";
                            else
                                return "rotate180";
                        }else if(previous.sign == 1 && this.sign == 0){
                            if(this.position < snakelength - 1 || this.inc == 31)
                                return "rotate270";
                            else
                                return "";
                        }
                    }
    }
}