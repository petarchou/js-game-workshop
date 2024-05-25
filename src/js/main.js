let state = initGameState();
let gameObjects = initGameObjects();

const characterKeys = [
    'KeyW',
    'KeyA',
    'KeyS',
    'KeyD',
    'Space',
]

//Game Setup
addGameControls()
startGameLogic()
restartGameLogic()




//Functions
function addGameControls() {
    // Movement
    document.addEventListener('keydown',(e)=>{
        if(characterKeys.includes(e.code)){
            state.keys[e.code] = true;
        }
    })
    document.addEventListener('keyup',(e)=>{
        if(characterKeys.includes(e.code)) {
            state.keys[e.code] = false;
        }
    })

    // Pause game
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            togglePause(state);
        }
    });


    //Debugging
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Digit2') {
            state.isGameOver= true
        }
    });
}

// to move in game engine when I implement level pausing
function togglePause(state) {
    state.paused = !state.paused
}

function startGameLogic() {
    gameObjects.startScrn.addEventListener('click',function(e){
        gameObjects.startScrn.classList.add('hidden')
        gameObjects.gameScrn.classList.remove('hidden')
    
    
        //start game
        startEngine(gameObjects, state);
    })
}

function restartGameLogic() {
    gameObjects.endScrn.addEventListener('click',function(e){
        gameObjects.startScrn.classList.add('hidden')
        gameObjects.gameScrn.classList.remove('hidden')
        gameObjects.endScrn.classList.add('hidden')
        restartGameState()
    
        //start game
        startEngine(gameObjects, state)
    })
}

function restartGameState() {
    state = initGameState()
    gameObjects = initGameObjects()
}