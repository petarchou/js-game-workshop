function initGameObjects() {
    const startScrn = document.querySelector('.start-screen');
    const gameScrn = document.querySelector('.game-screen');
    const endScrn = document.querySelector('.end-screen');
    const scoreboard = createScoreboard(gameScrn)
    const endScore = document.querySelector('.end-score');


    const createWizard = function(initialState) {
        let wizard = document.createElement('span');
        wizard.classList.add('wizard');

        let {height, width} = initialState;

        wizard.style.height = height + 'px';
        wizard.style.width = width + 'px';
        wizard.style.top = initialState.posY + 'px';
        wizard.style.left = initialState.posX + 'px';

        gameScrn.append(wizard);
        
        this.wizardElement = wizard;

        return wizard;
    }

    const createCharacterCanvas = function(initialState) {
        const canvas = document.createElement('canvas')
        canvas.classList.add('character')
        canvas.width = initialState.canvasWidth
        canvas.height = initialState.canvasHeight
        state.character.posX = canvas.style.left
        state.character.posY = canvas.style.top

        gameScrn.append(canvas)

        this.characterCanvas = canvas

        return canvas
    }

    const spawnBug = function(initialState) {
        const bugElement = document.createElement('span');
        bugElement.classList.add('bug');

        let {height, width} = initialState;

        bugElement.style.height = height + 'px';
        bugElement.style.width = width + 'px';
        bugElement.style.left = gameScrn.offsetWidth-50 + 'px';
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


    const spawnShuriken = function(state) {
        const {shuriken} = state
        const shurikenEl = document.createElement('canvas')
        shurikenEl.classList.add('shuriken')
        // shurikenEl.width = shuriken.width
        // shurikenEl.height = shuriken.height

        shurikenEl.style.top = shuriken.posY + 'px'
        shurikenEl.style.left = shuriken.posX + 'px'
        gameScrn.append(shurikenEl)

        return shurikenEl
    }

    return {
        startScrn,
        gameScrn,
        endScrn,
        scoreboard,
        endScore,
        createWizard,
        spawnBug,
        spawnFireball,
        spawnShuriken,
        createCharacterCanvas,
    };
}


function createScoreboard(gameScrn) {
    let scoreboard = document.querySelector('.score')
    console.log(scoreboard)

    if (!scoreboard) {
        scoreboard = document.createElement('div')
        scoreboard.classList.add('score')
        gameScrn.appendChild(scoreboard)
    }

    return scoreboard
}