function Snake_Element(id, pos){
        this.position = pos;
        this.id = id;
        this.inc = 0;
        this.sign = 0;
    }

Snake_Element.prototype.checkstartrotation = function(){
        if(this.inc == 1){
            if(this.sign == 1)
                return "rotate270";
            else
                return "rotate90";
            }else{
                if(this.sign == 0)
                    return "rotate180";
                else
                    return "";
            }
    }   
    
Snake_Element.prototype.newId = function(insormove, next){
        if(this.inc == 31){
            if((this.id - this.inc) < 0){
                if(this.sign == insormove)
                    return this.id + 930;
            }
            if((this.id + this.inc) > 960){
                if(this.sign != insormove)
                    return this.id - 930;
            }
        }
    
        if(this.inc == 1){
            if((this.id + this.inc) % 31 == 0){
                if((insormove == 0 && this.sign == 1 && this.position == 0) || (insormove == 1 && this.sign == 0))
                    return this.id - 30;
            }
            
            if(this.id % 31 == 0){
                if((insormove == 0 && this.sign == 0) || (insormove == 1 && this.sign == 1 && (next.id + 1) % 31 > 0))
                    return this.id + 30;
            }
        }
        return this.id;
    }

Snake_Element.prototype.changerotation = function(previous,snakelength){
        if(this.position < snakelength-1){
            if((this.inc == 1 && this.sign == 0 && previous.sign == 0) ||
                (this.inc == 31 && this.sign == 1 && previous.sign == 1))
                    return "rotate180";
            else if((this.inc == 1 && this.sign == 1 && previous.sign == 1) ||
                (this.inc == 31 && this.sign == 0 && previous.sign == 0))
                    return "";
                else {
                        if(previous.sign == 0 && this.sign == 1)
                            return "rotate90";
                        else if(previous.sign == 1 && this.sign == 0)
                            return "rotate270";
                }
            }else{
                if(this.inc == 1){
                    if(this.sign == 0)
                        return "";
                    else
                        return "rotate180";
                }else{
                    if(this.sign == 0)
                        return "rotate90";
                    else
                     return "rotate270";
                } 
            }
    }

Snake_Element.prototype.checkIfTouchBorder = function(){
        if(this.inc == 1){
            if(((this.id+1) % 31 == 0)|| this.id % 31 == 0)
                return true;
            }else{
                if(this.id + this.inc > 960 || this.id - this.inc < 0)
                    return true;
            }
                return false;
        }
