function startEngine(gameObjects, state) {
    let wizard = gameObjects.createWizard(state.wizard);
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function gameLoop(gameObjects,state) {
    console.log(state.keys);
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}