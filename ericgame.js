var player;
var platforms; 
var cursors;

class First extends Phaser.Scene{
    constructor()
    {
        super("First")
    }

    preload()
    {

        this.load.image('back', 'Assets/country-platform-files/layers/country-platform-back.png');
        this.load.image('forest', 'Assets/country-platform-files/layers/country-platform-tiles-example.png');
        this.load.image('set', 'Assets/country-platform-files/layers/country-platform-tileset.png');
        this.load.spritesheet('eric', 'Assets/eric.png', {frameWidth: 32, frameHeight: 32});
        
    }

    create()
    {
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'back').setOrigin(0);
        player = this.physics.add.sprite(0, 0, 'eric');
        platforms = this.physics.add.staticGroup();
        platforms.create(80, 200, 'forest').setScale(.25).refreshBody();
        this.physics.add.collider(player, platforms);
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

class Second extends Phaser.Scene{
    constructor()
    {
        super("Second")
    }

    preload()
    {

        this.load.image('back', 'Assets/country-platform-files/layers/country-platform-back.png');
        this.load.image('forest', 'Assets/country-platform-files/layers/country-platform-forest.png');
        this.load.image('set', 'Assets/country-platform-files/country-platform.psd')
        this.load.spritesheet('eric', 'Assets/eric.png', {frameWidth: 32, frameHeight: 32})
        
    }

    create()
    {
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'back').setOrigin(0);
        player = this.physics.add.sprite(0, 0, 'eric')
        platforms = this.physics.add.staticGroup()
        platforms.create(150, 112, 'set').setScale(1,1).refreshBody();
        this.physics.add.collider(player, platforms);
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
        this.bg.tilePosition.X += .5;

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
    }
}

const config = {
	type: Phaser.AUTO,
	width: 1024,
    height: 768/3.5,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
		}
	},
	scene: [First]
    
};

const game = new Phaser.Game(config);
