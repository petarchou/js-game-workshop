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
            posX: 0,
            posY: 0,
        },
        keys: {
            keyW : false,
            keyA : false,
            keyS : false,
            keyD : false,
        },

    }

    return state;
}

