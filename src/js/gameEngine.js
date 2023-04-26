function startEngine(gameObjects, state) {

    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}

function gameLoop(gameObjects,state) {
    console.log('frame');
    console.log(gameObjects.startScrn);
    window.requestAnimationFrame(gameLoop.bind(this,gameObjects,state));
}