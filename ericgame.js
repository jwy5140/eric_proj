
var player;
var platforms; 
var cursors;
var ground;

class Level extends Phaser.Scene{
    constructor(config)
    {
        super(config)
    }

    preload()
    {

        this.load.image('back', 'Assets/country-platform-files/layers/country-platform-back.png');
        this.load.image('ground', 'Assets/ground.png');
        this.load.spritesheet('eric', 'Assets/eric.png', {frameWidth: 32, frameHeight: 32});
        
    }

    create()
    {
        let cam = this.cameras.main
        this.bg = this.add.tileSprite(0, 0, gameState.width, gameState.height, 'back').setOrigin(0);
        player = this.physics.add.sprite(0, 0, 'eric');
        ground = this.add.tileSprite(0, 200, gameState.width, 50, 'ground').setOrigin(0);
        platforms = this.physics.add.staticGroup();
        
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

        cam.startFollow(player, true)
        cam.setBounds(0,0,gameState.width, gameState.height)
		this.physics.world.setBounds(0,0,gameState.width, gameState.height)
        }

    update()
    {
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
        if (cursors.space.isDown && player.body.touching.down) {
            player.setVelocityY(-160);
        }
        if (cursors.down.isDown){
            player.setVelocityY(100);
        }
        // if(this.player.sprite.x > 15400){
        //     this.scene.end(First);
        //     this.scene.start(Second);
        // }    
    }
}

class First extends Level{
    constructor()
    {
        super({key: "First"})
    }
}

class Second extends Level{
    constructor()
    {
        super({key: "Second"})
    }
}

const gameState = {
    width: 1000,
    height: 220
}
const config = {
	type: Phaser.AUTO,
	width: 612,
    height: 220,
    // scale: {
    //     mode: Phaser.Scale.ENVELOP,
    //     autoCenter: Phaser.Scale.NO_CENTER
    // },
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
		}
	},
	scene: [First, Second]
    
};

const game = new Phaser.Game(config);
