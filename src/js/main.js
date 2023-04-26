let state = initGameState();
let game = getGameObjects();

game.startScrn.addEventListener('click',(e)=>{
    game.startScrn.classList.add('hidden');
    game.gameScrn.classList.remove('hidden');
})

