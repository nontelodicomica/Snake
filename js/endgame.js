var starselected;

function blurstars(event){
    console.log('ok');
    let selected = event.target.id;
    for(let i = 1; i < 6; i++){
        if(i <= selected)
            document.getElementById(i).style.opacity = 1;
        else
            document.getElementById(i).style.opacity = 0.5;
    }
}

function select(event){
    starselected = event.target.id;
}

function insertRating(){
    window.location.assign('logout.php?rating='+starselected+'&exit='+true);
}