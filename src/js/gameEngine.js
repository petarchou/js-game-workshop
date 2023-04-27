function startEngine(gameObjects, state) {
    state.wizard.scale = 1;
    gameObjects.createWizard(state.wizard);
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function gameLoop(gameObjects,state,timestamp) {
    let isGameOver = false;
    // if(state.score >= state.nextLevel) {
    //     state.bug.speed +=2;
    //     console.log('levelUp');

    //     state.nextLevel += 100;
    // }

    const {wizard, fireball} = state;
    const {wizardElement} = gameObjects;

    //Move Wizard
    modifyWizardPosition(gameObjects, state);

    
    //Render Wizard
    wizardElement.style.left = wizard.posX+'px';
    wizardElement.style.top = wizard.posY+'px';

    //Spawn Fireballs
    if(state.keys.Space) {
        wizardElement.style.backgroundImage = 'url("/images/wizard-fire.png")';
        if(timestamp > fireball.nextSpawnTimestamp) {
            fireball.posX = wizard.posX + wizard.width;
            fireball.posY = wizard.posY + wizard.width/2.5;
            gameObjects.spawnFireball(fireball);

            fireball.nextSpawnTimestamp = timestamp + fireball.timeBetweenAttacks;
        }
    }
    else {
        wizardElement.style.backgroundImage = 'url("/images/wizard.png")';
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

    document.querySelectorAll('.bug').forEach(bugElement => {
        const pos = parseInt(bugElement.style.left);
        if(pos < -state.bug.width) {
            killBugAndAddScore(bugElement,state, gameObjects);
            return;
        }
        bugElement.style.left = (pos - state.bug.speed) + 'px';
    })

    //Fireball vs Bug collision
    document.querySelectorAll('.fireball').forEach(fireballElement => {
        document.querySelectorAll('.bug').forEach(bugElement=> {
            if(areColliding(fireballElement,bugElement)) {
                fireballElement.remove();
                killBugAndAddScore(bugElement,state, gameObjects);    
            }
        })
    })

    //Character vs Bug Collision (Game Over)
    document.querySelectorAll('.bug').forEach(bugElement=> {
        if(areColliding(wizardElement,bugElement)) {
            isGameOver = true;
            return;
        }
    })

    if(isGameOver) {
        // gameObjects.gameScrn.classList.add('hidden');
        // gameObjects.endScrn.classList.remove('hidden');
        // gameObjects.endScore.textContent = `Score: ${state.score} points`;

        alert('Game Over');
        return;      
    }
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

function areColliding(objectA, objectB) {
    let first = objectA.getBoundingClientRect();
    let second = objectB.getBoundingClientRect();

    const isSafeFromTop = first.top > second.bottom;
    const isSafeFromBottom = first.bottom  < second.top;
    const isSafeFromLeft = first.left > second.right;
    const isSafeFromRight = first.right < second.left;

    const collision = !isSafeFromTop && !isSafeFromRight && !isSafeFromBottom && !isSafeFromLeft;

    return collision;
}

function killBugAndAddScore(bugElement, state, gameObjects) {
    bugElement.remove();
    state.score += 10;
    gameObjects.scoreboard.textContent = `Score: ${state.score} points`;
}