
let level = 1
let attackDuration = 5
function initGameState() {
    level = 1
    attackDuration = 5
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
            speed: determineSpeed(250),
            isMoving: false,
            isShooting: false,
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
        enemies: {
            orc: {
                width: 100,
                height: 100,
                imageSrc: '/images/orc/Run00.png',
                imageTotalFrames: 12,
                animationDuration: 8,
                speed: determineSpeed(350),
                nextSpawnTimestamp: 0,
                spawnDelay: 680,
            }
        },
        fireball: {
            height: 30,
            width: 30,
            projectileSpeed: determineSpeed(200),
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
    character.animationDuration = 10
    character.animationCounter = 0
    character.imageTotalFrames = 6
}

function setWalkingImage(state) {
    const {character} = state
    character.playerImage.src = 'images/Run.png'
    character.currentFrame = 0
    character.animationDuration = 7
    character.animationCounter = 0
    character.imageTotalFrames = 8
}

function setAttackImage(state) {
    const {character} = state
    character.playerImage.src = 'images/Attack_1.png'
    character.currentFrame = 0
    character.animationDuration = attackDuration
    character.animationCounter = 0
    character.imageTotalFrames = 4
}

function determineSpeed(divisor) {
    const gameScreen = document.querySelector('.game')
    const rect = gameScreen.getBoundingClientRect()
    return rect.width / divisor
}

