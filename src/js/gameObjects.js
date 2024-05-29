function initGameObjects() {
    const startScrn = document.querySelector('.start-screen');
    const gameScrn = document.querySelector('.game-screen');
    const endScrn = document.querySelector('.end-screen');
    const scoreboard = createScoreboard(gameScrn)
    const endScore = document.querySelector('.end-score');

    gameScrn.style.border = "double 5px black"
    startScrn.style.border = "double 5px black"
    endScrn.style.border = "double 5px black"

    const createCharacterCanvas = function(initialState) {
        const canvas = document.createElement('canvas')
        canvas.classList.add('character')
        canvas.width = initialState.canvasWidth
        canvas.height = initialState.canvasHeight
        state.character.posX = gameScrn.offsetWidth*0.1
        state.character.posY = gameScrn.offsetHeight*0.6

        gameScrn.append(canvas)

        this.characterCanvas = canvas

        return canvas
    }

    const createOrcCanvas = function(initialState) {
        const {orc} = initialState.enemies
        const canvas = document.createElement('canvas')
        canvas.classList.add('orc')
        canvas.width = orc.width
        canvas.height = orc.height
        canvas.style.left = gameScrn.offsetWidth - canvas.width + 'px'
        canvas.style.top = Math.random()*(gameScrn.offsetHeight - canvas.height) + 'px';

        gameScrn.append(canvas)

        return canvas
    }

    const spawnBug = function(initialState) {
        const bugElement = document.createElement('span');
        bugElement.classList.add('bug');

        let {height, width} = initialState;

        bugElement.style.height = height + 'px';
        bugElement.style.width = width + 'px';
        bugElement.style.left = gameScrn.offsetWidth + 'px';
        bugElement.style.top = Math.random()*(gameScrn.offsetHeight-height) + 'px';

        gameScrn.appendChild(bugElement);

        return bugElement;
    }

    const spawnFireball = function(initialState) {
        const fireballElement = document.createElement('span');
        fireballElement.classList.add('fireball');

        let {height,width} = initialState;
        fireballElement.style.height = height + 'px';
        fireballElement.style.width = width + 'px';
        fireballElement.style.top = initialState.posY +'px';
        fireballElement.style.left = initialState.posX +'px';

        gameScrn.append(fireballElement);

        return fireballElement;
    }

    return {
        startScrn,
        gameScrn,
        endScrn,
        scoreboard,
        endScore,
        createOrcCanvas,
        spawnBug,
        spawnFireball,
        createCharacterCanvas,
    };
}


function createScoreboard(gameScrn) {
    let scoreboard = document.querySelector('.score')

    if (!scoreboard) {
        scoreboard = document.createElement('div')
        scoreboard.classList.add('score')
        gameScrn.appendChild(scoreboard)
    }

    return scoreboard
}