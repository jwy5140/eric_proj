class startScreen extends Phaser.Scene{
    constructor(config)
    {
        super(config)
    }

    preload(){
        this.load.image('spicyeric', 'Assets/officer.jpg')
    }
}