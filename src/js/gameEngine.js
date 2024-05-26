function startEngine(gameObjects, state) {
    renderScore(gameObjects, state)
    const canvas = gameObjects.createCharacterCanvas(state.character)
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function gameLoop(gameObjects,state,timestamp) {
    if (state.paused) {
        window.requestAnimationFrame(gameLoop.bind(this, gameObjects, state));
        return;
    }
    if (state.isGameOver) {
        alert('Game Over')
        // gameObjects.gameScrn.classList.add('hidden')
        // gameObjects.endScrn.classList.remove('hidden')
        // cleanUpGameScreen(gameObjects)
        return
    }


    if(state.score >= state.nextLevel) {
        state.bug.speed +=0.5;
        state.bug.spawnDelay *= 0.9
        console.log('levelUp');
        state.nextLevel += 100;
    }

    const {fireball, shuriken, character} = state;
    const {characterCanvas} = gameObjects

    character.changedState = false

    //Change character pos state
    modifyCharacterPositionState(gameObjects, state);

    animateCharacter(state, characterCanvas)
    
    //Render Character At Current Position
    characterCanvas.style.left = character.posX+'px'
    characterCanvas.style.top = character.posY+'px'
    // renderCharacter(characterCanvas, character);

    //Spawn Fireballs
    if(state.keys.Space) {
        setAttackImage(state)
        if(timestamp > fireball.nextSpawnTimestamp) {
            setTimeout(() => {
                fireball.posX = character.posX + character.frameWidth - 55;
                fireball.posY = character.posY + character.frameHeight/2;
                gameObjects.spawnFireball(fireball)
            }, 250)
            
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


    //Spawn bugs
    if(timestamp > state.bug.nextSpawnTimestamp) {
        gameObjects.spawnBug(state.bug);
        state.bug.nextSpawnTimestamp = timestamp + state.bug.spawnDelay;
    }

    //Render bugs

    document.querySelectorAll('.bug').forEach(bugElement => {
        const pos = parseInt(bugElement.style.left);
        if(pos < -state.bug.width) {
            killBug(bugElement)
            addScore(state, gameObjects);
            return;
        }
        bugElement.style.left = (pos - state.bug.speed) + 'px';
    })

    //Fireball vs Bug collision
    document.querySelectorAll('.fireball').forEach(fireballElement => {
        document.querySelectorAll('.bug').forEach(bugElement=> {
            if(areColliding(fireballElement,bugElement)) {
                fireballElement.remove();
                killBug(bugElement);    
                addScore(state, gameObjects);    
            }
        })
    })

    //Character vs Bug Collision (Game Over)
    document.querySelectorAll('.bug').forEach(bugElement=> {
        if(characterIsColiding(characterCanvas,bugElement)) {
            state.isGameOver = true;
            return;
        }
    })

    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function modifyCharacterPositionState(gameObjects, state) {

    const {character} = state;


    let isNowMoving = false;

    if(state.keys.KeyW) {
        //this 0 is hard-coded and prevents me from putting a smaller screen
        character.posY = Math.max(character.posY - character.speed, -44);
        isNowMoving = true
    }
    if(state.keys.KeyA){
        character.posX = Math.max(character.posX - character.speed, -40);
        isNowMoving = true
    }
    if(state.keys.KeyS) {
        character.posY = Math.min(character.posY + character.speed, gameObjects.gameScrn.clientHeight - character.frameWidth);
        isNowMoving = true
    }
    if(state.keys.KeyD){
        character.posX = Math.min(character.posX + character.speed, gameObjects.gameScrn.clientWidth - 77);
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

function areColliding(ObjectA, ObjectB) {
    let first = ObjectA.getBoundingClientRect();
    let second = ObjectB.getBoundingClientRect();

    const isSafeFromTop = first.top  > second.bottom;
    const isSafeFromBottom = first.bottom < second.top;
    const isSafeFromLeft = first.left > second.right;
    const isSafeFromRight = first.right < second.left;

    const collision = !isSafeFromTop && !isSafeFromRight && !isSafeFromBottom && !isSafeFromLeft;

    return collision;
}

function characterIsColiding(character, anotherObj) {
    let charRect = character.getBoundingClientRect();
    let second = anotherObj.getBoundingClientRect();

    const isSafeFromTop = charRect.top + 44 > second.bottom;
    const isSafeFromBottom = charRect.bottom < second.top;
    const isSafeFromLeft = charRect.left + 40 > second.right;
    const isSafeFromRight = charRect.right - 58 < second.left;

    const collision = !isSafeFromTop && !isSafeFromRight && !isSafeFromBottom && !isSafeFromLeft;

    return collision;
}

function killBug(bugElement) {
    bugElement.remove();
}

function addScore(state, gameObjects) {
    state.score += 10;
    renderScore(gameObjects, state)
}

function renderScore(gameObjects, state) {
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


    const centerX = character.canvasWidth / 2 - character.frameWidth / 2;
    const centerY = character.canvasHeight / 2 - character.frameHeight / 2;

    const currentFrameWidth = character.currentFrame * character.frameWidth

    ctx.drawImage(character.playerImage,
        currentFrameWidth, 0,
        character.frameWidth, character.frameHeight,
        centerX, centerY,
        character.frameWidth, character.frameHeight)

    rollThroughSprite(state)
}

// function animateShuriken(state, shurikenCanvas) {
//     const {shuriken} = state
//     const ctx = shurikenCanvas.getContext('2d')
//     ctx.clearRect(0, 0, shuriken.width, shuriken.height)

//     const currentFrameWidth = shuriken.currentFrame * shuriken.frameWidth

//     ctx.drawImage(shuriken.image,
//         currentFrameWidth, 0,
//         shuriken.width, shuriken.height,
//         0, 0,
//         shuriken.width, shuriken.height)
    
//         rollThroughShuriken(state, shurikenCanvas);
// }

// function rollThroughShuriken(state, shurikenCanvas) {
//     const {shuriken} = state
//     shuriken.animationCounter++
//     if(shuriken.animationCounter % shuriken.animationDuration == 0) {
//         shuriken.currentFrame+=1;
//     }
//     //0-indexed
//     if(shuriken.currentFrame >= shuriken.imageTotalFrames) {
//         shuriken.currentFrame = 0
//         shuriken.animationCounter = 0
//     }
//     window.requestAnimationFrame(animateShuriken.bind(this, state, shurikenCanvas))
// }


function rollThroughSprite(state) {

    const {character} = state
    character.animationCounter++
    if(character.animationCounter % character.animationDuration == 0) {
        character.currentFrame+=1;
    }
    //0-indexed
    if(character.currentFrame >= character.imageTotalFrames) {
        character.currentFrame = 0
        character.animationCounter = 0
    }
}

function cleanUpGameScreen(gameObjects) {
    const {gameScrn} = gameObjects

        const gameScrnElements = gameScrn.children
        for(i = 0; i < gameScrnElements.length; i++) {
            const el = gameScrnElements[i]
            if (!el.classList.contains('score')) {
                el.remove()
            }
        }
}