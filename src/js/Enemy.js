class Enemy {
    constructor(state, canvas) {
        this.posX = canvas.style.left
        this.posY = canvas.style.top
        this.currentFrame = 0
        this.animationCounter = 0

        //common state for the enemy type - in gameState
        const {imageSrc, imageTotalFrames, animationDuration, width, height, speed} = state.enemies.orc
        this.image = new Image()
        this.image.src = imageSrc
        this.imageTotalFrames = imageTotalFrames
        this.animationDuration = animationDuration
        this.width = width
        this.height = height
        this.speed = speed

        this.htmlElement = canvas
        window.requestAnimationFrame(this.animate.bind(this))
    }





    animate() {
        if(state.paused) {
            requestAnimationFrame(this.animate.bind(this))
            return
        }
        if(state.isGameOver) {
            return
        }
        
        const ctx = this.htmlElement.getContext('2d')
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.drawImage(this.image, 0 , 0, this.width, this.height)

        this.rollThroughSprite()
        requestAnimationFrame(this.animate.bind(this))
    }


    rollThroughSprite() {
        this.animationCounter++

        if(this.animationCounter % this.animationDuration == 0) {
            this.currentFrame += 1

            if(this.currentFrame >= this.imageTotalFrames) {
                this.currentFrame = 0
                this.animationCounter = 0
            }

            if (this.currentFrame < 10) {
                this.image.src = `/images/orc/Run0${this.currentFrame}.png`
            } else {
                this.image.src = `/images/orc/Run${this.currentFrame}.png`
            }
        }

    }

    //suhranqva state-a na enemy-to

    //moga da vikam enemy-to da se animate-va

    //toest toi da suhranqva i html elementa

    //enemy-to da se iztriva pri opredeleni sluchai - otdelen metod za tova

    //animate - golqm metod, koito vika move za dvijenie - taka moje animate da se extendva s novi funkcionalnosti


}