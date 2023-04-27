let state = initGameState();
let gameObjects = getGameObjects();

const validKeys = [
    'KeyW',
    'KeyA',
    'KeyS',
    'KeyD',
    'Space',
]

document.addEventListener('keydown',(e)=>{
    // console.log(e.code);
    if(validKeys.includes(e.code)){
        state.keys[e.code] = true;
    }
})
document.addEventListener('keyup',(e)=>{
    if(validKeys.includes(e.code)) {
        state.keys[e.code] = false;
    }
})

gameObjects.startScrn.addEventListener('click',function(e){
    gameObjects.startScrn.classList.add('hidden');
    gameObjects.gameScrn.classList.remove('hidden');


    //start game
    startEngine(gameObjects, state);
})

