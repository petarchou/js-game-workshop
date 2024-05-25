function startEngine(gameObjects, state) {
    const canvas = gameObjects.createCharacterCanvas(state.character)
    canvas.style.border = '5px black solid'
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
    //call character animation start here
}

/*

character state:
- playerSprite (object)
- spriteTotalFrames (spriteWidth % 128)
- frameHeight
- frameWidth
- currentFrame (0 - spriteTotalFrames)
- animationDuration
- canvasWidth (determines character width)
- canvasHeight (determines character height)
- 

character created - initially idle
- whenever idle (no move / attack), needs to be animating idling
- whenever moving, needs to be walking

so animations need to always be running, the things that change are:
1. the character sprite
2. the speed of animation

*/

function gameLoop(gameObjects,state,timestamp) {
    if (state.paused) {
        window.requestAnimationFrame(gameLoop.bind(this, gameObjects, state));
        return;
    }
    if (state.isGameOver) {
        alert('Game Over');
        gameObjects.gameScrn.classList.add('hidden');
        gameObjects.endScrn.classList.remove('hidden');
        return; 
    }


    if(state.score >= state.nextLevel) {
        state.bug.speed +=0.5;
        state.bug.spawnDelay *= 0.9
        console.log('levelUp');
        state.nextLevel += 100;
    }

    const {fireball, character} = state;
    const {characterCanvas} = gameObjects

    character.changedState = false

    //Change character pos state
    modifyCharacterPosition(gameObjects, state);


    animateCharacter(state, characterCanvas)
    
    //Render Character At Current Position
    characterCanvas.style.left = character.posX+'px';
    characterCanvas.style.top = character.posY+'px';

    //Spawn Fireballs
    if(state.keys.Space) {
        setAttackImage(state)
        if(timestamp > fireball.nextSpawnTimestamp) {
            fireball.posX = character.posX + character.frameWidth;
            fireball.posY = character.posY + character.frameWidth/1.2;
            gameObjects.spawnFireball(fireball);

            fireball.nextSpawnTimestamp = timestamp + fireball.timeBetweenAttacks;
        }
    }

    //Render Fireballs
    document.querySelectorAll('.fireball').forEach(fireballElement => {
        const pos = parseInt(fireballElement.style.left);
        if(pos >= gameObjects.gameScrn.offsetWidth) {
            fireballElement.remove();
        }
        fireballElement.style.left = (pos+fireball.projectileSpeed)+'px';
    });


    // //Spawn bugs
    // if(timestamp > state.bug.nextSpawnTimestamp) {
    //     gameObjects.spawnBug(state.bug);
    //     state.bug.nextSpawnTimestamp = timestamp + state.bug.spawnDelay;
    // }

    // //Render bugs

    // document.querySelectorAll('.bug').forEach(bugElement => {
    //     const pos = parseInt(bugElement.style.left);
    //     if(pos < -state.bug.width) {
    //         killBug(bugElement)
    //         addScore(state, gameObjects);
    //         return;
    //     }
    //     bugElement.style.left = (pos - state.bug.speed) + 'px';
    // })

    // //Fireball vs Bug collision
    // document.querySelectorAll('.fireball').forEach(fireballElement => {
    //     document.querySelectorAll('.bug').forEach(bugElement=> {
    //         if(areColliding(fireballElement,bugElement)) {
    //             fireballElement.remove();
    //             killBug(bugElement);    
    //             addScore(state, gameObjects);    
    //         }
    //     })
    // })

    // //Character vs Bug Collision (Game Over)
    // document.querySelectorAll('.bug').forEach(bugElement=> {
    //     if(areColliding(wizardElement,bugElement)) {
    //         state.isGameOver = true;
    //         return;
    //     }
    // })

    // if(isGameOver) {
    //     // gameObjects.gameScrn.classList.add('hidden');
    //     // gameObjects.endScrn.classList.remove('hidden');
    //     // gameObjects.endScore.textContent = `Score: ${state.score} points`;     
    // }
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function modifyCharacterPosition(gameObjects, state) {

    const {character} = state;

    let isNowMoving = false;

    if(state.keys.KeyW) {
        //this 0 is hard-coded and prevents me from putting a smaller screen
        character.posY = Math.max(character.posY - character.speed,0);
        isNowMoving = true
    }
    if(state.keys.KeyA){
        character.posX = Math.max(character.posX - character.speed,0);
        isNowMoving = true
    }
    if(state.keys.KeyS) {
        //to be replaced with the frame size
        character.posY = Math.min(character.posY + character.speed,gameObjects.gameScrn.offsetHeight-(character.canvasHeight));
        isNowMoving = true
    }
    if(state.keys.KeyD){
        character.posX = Math.min(character.posX + character.speed,gameObjects.gameScrn.offsetWidth-(character.canvasWidth));
        isNowMoving = true
    }

    characterStateChange(character, isNowMoving)
}

function characterStateChange(character, isNowMoving) {
    if (isNowMoving && !character.isMoving) {
        character.isMoving = true
        character.changedState = true
    } else if(!isNowMoving && character.isMoving) {
        character.isMoving = false;
        character.changedState = true;
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

function killBug(bugElement) {
    bugElement.remove();
}

function addScore(state, gameObjects) {
    state.score += 10;
    gameObjects.scoreboard.textContent = `Score: ${state.score} points`;
}

function animateCharacter(state, characterCanvas) {
    const {character} = state
    if(character.isMoving && character.changedState) {
        setWalkingImage(state)
    } else if (!character.isMoving && character.changedState) {
        setIdleImage(state)
    }
    const ctx = characterCanvas.getContext('2d')
    ctx.clearRect(0, 0, character.canvasWidth, character.canvasHeight)
    // ctx.fillRect(50, 50, 100, 100)
    const currentFrameWidth = character.currentFrame * character.frameWidth
    ctx.drawImage(character.playerImage, currentFrameWidth ,0 , character.frameWidth, character.frameHeight, 0, 0, character.canvasWidth, character.canvasHeight)

    rollThroughSprite(character, characterCanvas)
}


function rollThroughSprite(state) {
    state.animationCounter++
    if(state.animationCounter % state.animationDuration == 0) {
        state.currentFrame+=1;
    }
    //0-indexed
    if(state.currentFrame >= state.imageTotalFrames) {
        state.currentFrame = 0
        state.counter = 0
    }
}

function getAnimationCounter() {
    let counter = 0

    function getCounter() {
        return counter
    }

    function incrementCounter() {
        counter++
    }

    return {get}
}