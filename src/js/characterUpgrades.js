//not used yet

function biggerFireball(state) {
    state.fireball.height *= 1.2
    state.fireball.width *= 1.2
}



function fasterReload(state) {
    level++
    state.fireball.timeBetweenAttacks *= 0.9
    if(level % 10 == 0) {
        attackDuration = Math.max(2, attackDuration-1)
    }
    
}