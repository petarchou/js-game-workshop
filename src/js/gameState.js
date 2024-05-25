function initGameState() {
    const state = {
        score: 0,
        nextLevel: 100,
        character: {
            playerImage: new Image(),
            imageTotalFrames: 6,
            currentFrame: 0,
            animationDuration: 20,
            animationCounter: 0,
            frameWidth: 128,
            frameHeight: 128,
            canvasWidth: 128,
            canvasHeight: 128,
            posX: 300,
            posY: 200,
            speed: 5,
            isMoving: false,
            changedState: false,
        },
        wizard: {
            height:100,
            width:82,
            posX: 300,
            set scale(n) {
                this.width *= n;
                this.height *= n;
            },
            posY: 200,
            speed: 5,
        },
        bug: {
            height: 50,
            width: 50,
            set scale(n) {
                this.width *= n;
                this.height *= n;
            },
            nextSpawnTimestamp: 0,
            spawnDelay: 800,
            speed: 3,
        },
        fireball: {
            height: 25,
            width: 25,
            projectileSpeed: 5,
            timeBetweenAttacks: 500,
            nextSpawnTimestamp: 0,
        },

        keys: {
            keyW : false,
            keyA : false,
            keyS : false,
            keyD : false,
            Space : false,
        },

        paused: false,
        isGameOver: false,

    }

    setIdleImage(state)

    return state;
}



function setIdleImage(state) {
    const {character} = state
    character.playerImage.src = 'images/Idle.png'
    character.currentFrame = 0
    character.animationDuration = 20
    character.animationCounter = 0
    character.imageTotalFrames = 6
}

function setWalkingImage(state) {
    const {character} = state
    character.playerImage.src = 'images/Walk.png'
    character.currentFrame = 0
    character.animationDuration = 20
    character.animationCounter = 0
    character.imageTotalFrames = 8
}

function setAttackImage(state) {
    const {character} = state
    character.playerImage.src = 'images/Attack_1.png'
    character.currentFrame = 0
    character.animationDuration = 15
    character.animationCounter = 0
    character.imageTotalFrames = 4
}

