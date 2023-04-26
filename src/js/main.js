let state = initGameState();
let gameObjects = getGameObjects();

gameObjects.startScrn.addEventListener('click',function(e){
    gameObjects.startScrn.classList.add('hidden');
    gameObjects.gameScrn.classList.remove('hidden');


    //start game
    startEngine(gameObjects, state);
})

