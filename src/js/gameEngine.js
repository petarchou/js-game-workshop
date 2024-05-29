function startEngine(gameObjects, state) {
    renderScore(gameObjects, state)
    gameObjects.createCharacterCanvas(state.character)
    requestAnimationFrame(gameLoop.bind(this, gameObjects, state))
}

function gameLoop(gameObjects, state, timestamp) {
    if (state.paused) {
        window.requestAnimationFrame(gameLoop.bind(this, gameObjects, state));
        return;
    }
    if (state.isGameOver) {
        alert('Game Over')
        gameObjects.gameScrn.classList.add('hidden')
        gameObjects.endScrn.classList.remove('hidden')
        gameObjects.endScore.textContent = `Score: ${state.score} points`;
        cleanUpGameScreen(gameObjects)
        return
    }


    if (state.score >= state.nextLevel) {
        state.enemies.orc.speed += 0.5;
        state.enemies.orc.spawnDelay *= 0.9
        console.log('levelUp');
        state.nextLevel += 100;
    }

    const { fireball, character } = state;
    const { characterCanvas } = gameObjects

    character.changedState = false

    //Change character pos state
    modifyCharacterPositionState(gameObjects, state);

    animateCharacter(state, characterCanvas)

    //Render Character At Current Position
    characterCanvas.style.left = character.posX + 'px'
    characterCanvas.style.top = character.posY + 'px'

    //Spawn Fireballs
    if (state.keys.Space && !character.isShooting) {
        if (timestamp > fireball.nextSpawnTimestamp) {
            character.isShooting = true
            setAttackImage(state)
            window.requestAnimationFrame(shootFireball.bind(this, state, gameObjects))
            fireball.nextSpawnTimestamp = timestamp + fireball.timeBetweenAttacks;
        }
    }

    function shootFireball(state, gameObjects) {
        const {fireball, character} = state
        if (character.currentFrame == character.imageTotalFrames - 1) {
            fireball.posX = character.posX + character.frameWidth - 55;
            fireball.posY = character.posY + character.frameHeight / 2;
            gameObjects.spawnFireball(fireball)
            character.isShotFired = true
        } else {
            window.requestAnimationFrame(shootFireball.bind(this, state, gameObjects))
        }
    }


    //Render Fireballs
    document.querySelectorAll('.fireball').forEach(fireballElement => {
        const pos = parseInt(fireballElement.style.left);
        if (pos >= gameObjects.gameScrn.offsetWidth) {
            fireballElement.remove();
        }
        fireballElement.style.left = (pos + fireball.projectileSpeed) + 'px';
    });

    if(timestamp > state.enemies.orc.nextSpawnTimestamp) {
        let orc = new Enemy(state, gameObjects.createOrcCanvas(state))
        orc.animate()
        state.enemies.orc.nextSpawnTimestamp = timestamp + state.enemies.orc.spawnDelay
    }

    //Move enemies 

    document.querySelectorAll('.orc').forEach(orcElement => {
        const pos = parseInt(orcElement.style.left);
        if (pos < -state.enemies.orc.width) {
            removeFromScreen(orcElement)
            return;
        }
        orcElement.style.left = (pos - state.enemies.orc.speed) + 'px';
    })

     //Fireball vs Orc collision
     document.querySelectorAll('.fireball').forEach(fireballElement => {
        document.querySelectorAll('.orc').forEach(orcElement => {
            if (areColliding(fireballElement, orcElement)) {
                fireballElement.remove();
                removeFromScreen(orcElement);
                addScore(state, gameObjects);
            }
        })
    })

    //Character vs Orc Collision (Game Over)
    document.querySelectorAll('.orc').forEach(orcElement => {
        if (characterIsColiding(characterCanvas, orcElement)) {
            state.isGameOver = true;
            return;
        }
    })

    window.requestAnimationFrame(gameLoop.bind(this, gameObjects, state));
}




function modifyCharacterPositionState(gameObjects, state) {

    const { character } = state;


    let isNowMoving = false;

    if (state.keys.KeyW) {
        //this 0 is hard-coded and prevents me from putting a smaller screen
        character.posY = Math.max(character.posY - character.speed, -44);
        isNowMoving = true
    }
    if (state.keys.KeyA) {
        character.posX = Math.max(character.posX - character.speed, -40);
        isNowMoving = true
    }
    if (state.keys.KeyS) {
        character.posY = Math.min(character.posY + character.speed, gameObjects.gameScrn.clientHeight - character.frameWidth);
        isNowMoving = true
    }
    if (state.keys.KeyD) {
        character.posX = Math.min(character.posX + character.speed, gameObjects.gameScrn.clientWidth - 77);
        isNowMoving = true
    }

    characterStateChange(character, isNowMoving)
}

function characterStateChange(character, isNowMoving) {
    if (isNowMoving && !character.isMoving) {
        character.isMoving = true
        character.changedState = true
    } else if (!isNowMoving && character.isMoving) {
        character.isMoving = false;
        character.changedState = true;
    }
}

//TODO need to measure empty pixels in the orc canvas
function areColliding(ObjectA, ObjectB) {
    let first = ObjectA.getBoundingClientRect();
    let second = ObjectB.getBoundingClientRect();

    const isSafeFromTop = first.top > second.bottom;
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

function removeFromScreen(element) {
    element.remove();
}

function addScore(state, gameObjects) {
    state.score += 10;
    renderScore(gameObjects, state)
}

function renderScore(gameObjects, state) {
    gameObjects.scoreboard.textContent = `Score: ${state.score} points`;
}

function animateCharacter(state, characterCanvas) {
    const { character } = state

    if (character.isShooting && !character.isShotFired) {
        //do nothing - we want the animation to finish
    }
    else if (character.isShooting && character.isShotFired) {
        if (character.isMoving) {
            setWalkingImage(state)
        } else {
            setIdleImage(state)
        }
        character.isShooting = false
        character.isShotFired = false
    }
    else if (character.isMoving && character.changedState) {
        setWalkingImage(state)
    } else if (!character.isMoving && character.changedState) {
        setIdleImage(state)
    }


    const ctx = characterCanvas.getContext('2d')
    ctx.clearRect(0, 0, character.canvasWidth, character.canvasHeight)


    const currentFrameWidth = character.currentFrame * character.frameWidth

    ctx.drawImage(character.playerImage,
        currentFrameWidth, 0,
        character.frameWidth, character.frameHeight,
        0, 0,
        character.canvasWidth, character.canvasHeight)
    rollThroughSprite(state)
}



function rollThroughSprite(state) {
    const { character } = state
    character.animationCounter++
    if (character.animationCounter % character.animationDuration == 0) {
        character.currentFrame += 1;
    }
    //0-indexed
    if (character.currentFrame >= character.imageTotalFrames) {
        character.currentFrame = 0
        character.animationCounter = 0
    }
}

function cleanUpGameScreen(gameObjects) {
    const { gameScrn } = gameObjects

    let scoreToReappend
    while (gameScrn.firstElementChild) {
        if (gameScrn.firstElementChild.classList.contains('score')) {
            scoreToReappend = gameScrn.firstElementChild
        }

        gameScrn.removeChild(gameScrn.firstElementChild)
    }
    gameScrn.append(scoreToReappend)
}