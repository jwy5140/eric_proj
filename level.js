class Level extends Phaser.Scene{
    constructor()
    {
        super({key: "Level"})
    }

    preload()
    {

        this.load.image('back', 'Assets/country-platform-files/layers/country-platform-back.png');
        this.load.image('ground', 'Assets/ground.png');
        this.load.spritesheet('eric', 'Assets/eric.png', {frameWidth: 32, frameHeight: 32});
        
    }

    create()
    {
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'back').setOrigin(0);
        player = this.physics.add.sprite(0, 0, 'eric');
        ground = this.add.tileSprite(0, 200, game.config.width*2, 50, 'ground').setOrigin(0).setScale(.5);
        platform = this.physics.add.staticGroup();
        
        this.physics.add.existing(ground);
        ground.enableBody = true;
        ground.body.allowGravity = false;
        ground.body.immovable = true;
        this.physics.add.collider(player, ground);
		player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('eric', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'eric', frame: 3 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('eric', { start: 4, end: 6 }),
            frameRate: 6,
            repeat: -1
        });


    }

    update()
    {
        // this.bg.tilePosition.X += .5;
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true)
		} else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true)
		} else {
            player.setVelocityX(0);
            player.anims.play('turn')
        }
        if (cursors.space.isDown) {
            player.setVelocityY(-160);
        }
        // if(this.player.sprite.x > 15400){
        //     this.scene.end(First);
        //     this.scene.start(Second);
        // }    
    }
}