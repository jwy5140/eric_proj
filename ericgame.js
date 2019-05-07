var player;
var platforms; 
var cursors;

    function preload()
    {

        this.load.image('back', 'Assets/country-platform-files/layers/country-platform-back.png');
        this.load.image('forest', 'Assets/country-platform-files/layers/country-platform-forest.png');
        this.load.image('set', 'Assets/country-platform-files/country-platform.psd')
        this.load.spritesheet('eric', 'Assets/eric.png', {frameWidth: 32, frameHeight: 32})
        
    }

    function create()
    {
        this.add.image(192, 112,'back')
        player = this.physics.add.sprite(225, 0, 'eric').setScale(1.2)
        platforms = this.physics.add.staticGroup()
        platforms.create(150, 112, 'forest').setScale(1, .2).refreshBody();
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

    function update()
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
        if (cursors.space.isDown) {
            player.setVelocityY(-160);
        }
    }


const config = {
	type: Phaser.AUTO,
	width: 384,
	height: 224,
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
		}
	},
	scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config)