class ModalTutorial{
    constructor(){
        this.indexscorrimento = 0;
    }

    populateModal(){
        for(let i = 0; i < 2; i++)
            this.createButtons(i);
        this.createModalContent();
    }

    createButtons(i){
            let image;
            let j = document.createElement("div");
                if(i == 0){
                    j.id = "exitbutton";
                    image = "cross";
                    j.addEventListener("click",this.startgame);
                }else if(i == 1){
                    j.id = "next";
                    image = "cursor_right";
                    j.addEventListener("click",this.nextModal.bind(this));
                }else{
                    j.id = "previous";
                    image = "cursor_left";
                    j.addEventListener("click",this.previousmodal.bind(this));
                }
            j.style.backgroundImage = "url(\"./img/buttons/"+image+".png\")";
            j.className = "buttonmodal";
            document.getElementById("buttonspace").appendChild(j);
    }

    startgame(){
        document.body.removeChild(document.getElementById("modal"));
        document.body.removeChild(document.getElementById("backgroundmodal"));
    }

    createModalContent(){
        let img = document.createElement("img");
        if(this.indexscorrimento < 6){
            img.src = "./img/Tutorial/"+this.indexscorrimento+".png";
            document.getElementById("description").appendChild(img);
        }
        document.getElementById("description").appendChild(this.chooseRightDescription());
        return;
        }

    chooseRightDescription(){
        var text = document.createElement("h3");

        switch(this.indexscorrimento){
            case 0: let welcome = document.createElement("h2");
                    welcome.innerText = "Benvenuto!";
                    document.getElementById("description").appendChild(welcome);
                    text.innerText = "Clicca sul campo da gioco per iniziare";
                    break;
            case 1: text.innerText = "Per cambiare la direzione del serpente è sufficiente premere le frecce della tastiera! ";
                    text.innerText += "E' consentita l'inversione del senso di marcia";
                    break;
            case 2: text.innerText = "Lo score viene incrementato o decrementato ";
                    text.innerText += "a seconda dell'elemento di cui si nutre il serpente";
                    break;
            case 3: text.innerText = "Se il serpente tocca il bordo del campo da gioco il giocatore perde";
                    break;
            case 4: text.innerText = "E' possibile visualizzare il punteggio attuale ";
                    text.innerText += "e il migliore punteggio conseguito qui";
                    break;
            case 5: text.innerHTML = "Cliccando sulle immagini colorate è possibile cambiare il colore del serpente durante la partita";
                    break;
            case 6: text.innerHTML = "Nota: è possibile incrementare la velocità del serpente ";
                    text.innerText += "per un breve lasso di tempo premendo il tasto SPACE.";
                    let endpresentation = document.createElement("h2");
                    endpresentation.innerText = "Buon divertimento!";
                    document.getElementById("description").appendChild(endpresentation);
                    break;
            }
            return text;
        }

    nextModal(){
            this.indexscorrimento++;
            document.getElementById("description").innerHTML = "";
            if(this.indexscorrimento == 1 && document.getElementById("previous") == undefined)
                this.createButtons(2);
            if(this.indexscorrimento == 6)
                document.getElementById("buttonspace").removeChild(next);
        
            this.createModalContent();
        }

    previousmodal(){
            this.indexscorrimento--;
            document.getElementById("description").innerHTML = "";
            if(this.indexscorrimento == 5 && document.getElementById("next") == undefined)
                this.createButtons(1);
            if(this.indexscorrimento == 0)
                document.getElementById("buttonspace").removeChild(previous);
            
        this.createModalContent();
    }
}