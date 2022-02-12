var game;

function begin(){
    var tutorial = new ModalTutorial();
    game = new Game();
    game.buildimages();
    game.createbackgroundGame();
    tutorial.createModal();
}