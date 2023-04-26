function startEngine(gameObjects, state) {
    gameObjects.createWizard(state.wizard);
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function gameLoop(gameObjects,state) {

    const {wizard} = state;
    const {wizardElement} = gameObjects;

    //Move Wizard
    if(state.keys.KeyW) {
        wizard.posY -= wizard.speed;
    }
    if(state.keys.KeyA){
        wizard.posX -=wizard.speed;
    }
    if(state.keys.KeyS) {
        wizard.posY +=wizard.speed;
    }
    if(state.keys.KeyD){
        wizard.posX +=wizard.speed;
    }


    //Render Wizard
    wizardElement.style.left = wizard.posX+'px';
    wizardElement.style.top = wizard.posY+'px';

    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}