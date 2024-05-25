let state = initGameState();
let gameObjects = getGameObjects();

const validKeys = [
    'KeyW',
    'KeyA',
    'KeyS',
    'KeyD',
    'Space',
]

// to move in game engine when I implement level pausing
function togglePause(state) {
    state.paused = !state.paused;
}

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

document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        togglePause(state);
    }
});

gameObjects.startScrn.addEventListener('click',function(e){
    gameObjects.startScrn.classList.add('hidden');
    gameObjects.gameScrn.classList.remove('hidden');


    //start game
    startEngine(gameObjects, state);
})

// gameObjects.endScrn.addEventListener('click', function(e) {
//     gameObjects.endScrn.classList.add('hidden');
//     gameObjects.gameScrn.classList.remove('hidden');

//     state = initGameState();

//     startEngine(gameObjects,state);
// })

