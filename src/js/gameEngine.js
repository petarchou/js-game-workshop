function startEngine(gameObjects, state) {
    state.wizard.scale = 1.2;
    gameObjects.createWizard(state.wizard);
    window.requestAnimationFrame(timestamp => gameLoop(gameObjects,state,timestamp));
}

function gameLoop(gameObjects,state,timestamp) {

    const {wizard} = state;
    const {wizardElement} = gameObjects;

    //Move Wizard
    modifyWizardPosition(gameObjects, state);


    //Render Wizard
    wizardElement.style.left = wizard.posX+'px';
    wizardElement.style.top = wizard.posY+'px';

    //Spawn bugs
    if(timestamp > state.bug.nextSpawnTimestamp) {
        gameObjects.spawnBug(state.bug);
        state.bug.nextSpawnTimestamp = timestamp + state.bug.spawnDelay;
    }

    //Render bugs

    document.querySelectorAll('.bug').forEach(el => {
        const pos = parseInt(el.style.left);
        if(pos < -state.bug.width) {
            el.remove();
            return;
        }
        el.style.left = (pos - state.bug.speed) + 'px';
    })


    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function modifyWizardPosition(gameObjects, state) {

    const {wizard} = state;

    if(state.keys.KeyW) {
        wizard.posY = Math.max(wizard.posY - wizard.speed,0);
    }
    if(state.keys.KeyA){
        wizard.posX = Math.max(wizard.posX - wizard.speed,0);
    }
    if(state.keys.KeyS) {
        wizard.posY = Math.min(wizard.posY + wizard.speed,gameObjects.gameScrn.offsetHeight-(wizard.height));
    }
    if(state.keys.KeyD){
        wizard.posX = Math.min(wizard.posX + wizard.speed,gameObjects.gameScrn.offsetWidth-(wizard.width));
    }
}