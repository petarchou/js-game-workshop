function startEngine(gameObjects, state) {
    state.wizard.scale = 1.2;
    gameObjects.createWizard(state.wizard);
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function gameLoop(gameObjects,state) {

    const {wizard} = state;
    const {wizardElement} = gameObjects;

    //Move Wizard
    modifyWizardPosition(gameObjects, state);


    //Render Wizard
    wizardElement.style.left = wizard.posX+'px';
    wizardElement.style.top = wizard.posY+'px';

    //Spawn bugs
    gameObjects.spawnBug(state.bug);

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