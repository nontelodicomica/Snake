<?php 
    session_start();
    function showTest(){?>
        <div id= 'testcontent'>
            <strong> Vuoi iniziare una partita di prova?</strong>
            <p>Nota: il punteggio conseguito in questa non sarà salvato!</p>
            <button onclick='location.replace("./menu.php")'>No</button>
            <button onclick='location.replace("../../game.php?test=true")'>OK</button>
        </div>
    <?php 
    }
?>