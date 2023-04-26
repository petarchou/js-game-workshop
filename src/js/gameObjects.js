function getGameObjects() {
    const startScrn = document.querySelector('.start-screen');
    const gameScrn = document.querySelector('.game-screen');

    const createWizard = function(initialState) {
        let wizard = document.createElement('div');
        wizard.classList.add('wizard');

        let [height,width] = [100*initialState.scale, 82*initialState.scale];

        wizard.style.height = height + 'px';
        wizard.style.width = width + 'px';
        wizard.style.top = initialState.top + 'vh';
        wizard.style.left = initialState.left + 'vw';

        gameScrn.append(wizard);
        return wizard;
    }

    return {
        startScrn,
        gameScrn,
        createWizard,
    };
}