function startEngine(gameObjects, state) {
    state.wizard.scale = 1;
    gameObjects.createWizard(state.wizard);
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function gameLoop(gameObjects,state,timestamp) {

    const {wizard, fireball} = state;
    const {wizardElement} = gameObjects;

    //Move Wizard
    modifyWizardPosition(gameObjects, state);

    
    //Render Wizard
    wizardElement.style.left = wizard.posX+'px';
    wizardElement.style.top = wizard.posY+'px';

    //Spawn Fireballs
    if(state.keys.Space) {
        if(timestamp > fireball.nextSpawnTimestamp) {
            wizardElement.style.backgroundImage = 'url("/src/images/wizard-fire.png")';
            fireball.posX = wizard.posX + wizard.width;
            fireball.posY = wizard.posY + wizard.width/2.5;
            gameObjects.spawnFireball(fireball);

            fireball.nextSpawnTimestamp = timestamp + fireball.timeBetweenAttacks;
        }
    }
    else {
        wizardElement.style.backgroundImage = 'url("/src/images/wizard.png")';
    }

    //Render Fireballs
    document.querySelectorAll('.fireball').forEach(fireballElement => {
        const pos = parseInt(fireballElement.style.left);
        if(pos >= gameObjects.gameScrn.offsetWidth) {
            fireballElement.remove();
        }
        fireballElement.style.left = (pos+fireball.projectileSpeed)+'px';
    });


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
