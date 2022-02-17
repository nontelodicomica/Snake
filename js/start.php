function begin(){
    game = new Game();
    game.buildimages();
    game.createbackgroundGame();

<?php
    session_start();
    header('Content-Type: application/javascript');

    if($_SESSION['firsttime'] == true){
?>
        let tutorial = new ModalTutorial();
        tutorial.populateModal();
    <?php $_SESSION['firsttime'] = false; } ?>
}