<script>
    function goToMenu(){
        location.replace("./menu.php");
    }
    function goToTest(){
        location.replace("../../game.php?test=true");
    }
</script>

<?php 
    session_start();
    function showTest(){?>
        <div id= 'testcontent'>
            <strong> Vuoi iniziare una partita di prova?</strong>
            <p>Nota: il punteggio conseguito in questa non sarà salvato!</p>
            <button onclick= goToMenu()>No</button>
            <button onclick= goToTest()>OK</button>
        </div>
    <?php 
    }
?>