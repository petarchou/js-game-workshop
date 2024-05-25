function biggerFireball(state) {
    state.fireball.height *= 1.2
    state.fireball.width *= 1.2
}

function fasterReload() {
    state.fireball.timeBetweenAttacks *= 0.7
}