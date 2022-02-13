var game;

function begin(){
    let tutorial = new ModalTutorial();
    game = new Game();
    game.buildimages();
    game.createbackgroundGame();
    tutorial.populateModal();
}