function getGameObjects() {
    const startScrn = document.querySelector('.start-screen');
    const gameScrn = document.querySelector('.game-screen');

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

    return {
        startScrn,
        gameScrn,
        createWizard,
        spawnBug,
    };
}