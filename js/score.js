function youlose(){
    let score = document.getElementById('currentscore');
    let bestscore = document.getElementById('bestscore');
    if(score !== null){
      document.getElementById('endgamemodal').style.display = 'block';

      let first;
      if(score.value > bestscore.value)
        first = 'New best score: ';
      else
        first = 'Punteggio conseguito: ';

      document.getElementById('score').innerText = first+score.value + '!';
      document.getElementById('exit').addEventListener('click',function(){
                                                                location.replace('./php/logout.php');
      });
        $.ajax({
            type: 'POST',
            url: './php/updatescore.php',
            data: 'score='+ score.value,
            dataType: 'application/json'
          });
  }else{ 
    document.getElementById('endgamemodal').removeChild(document.getElementById('playagain'));
    document.getElementById('exit').addEventListener('click',function(){
                                                              location.replace('./php/account.php');
                                                            });
    document.getElementById('endgamemodal').style.display = 'block';
    document.getElementById('score').innerText = 'Fine prova!';
    return;
  }
}
