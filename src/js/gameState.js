function initGameState() {
    const state = {
        score: 0,
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
            spawnDelay: 1000,
            speed: 5,
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

    }

    return state;
}

