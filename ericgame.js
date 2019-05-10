
var platforms; 
var cursors;
var ground;
var portal;
var player;

class Start extends Phaser.Scene{
    constructor(config)
    {
        super(config, {key: 'Start'})
    }

    preload()
    {
        this.load.image('ericDesk', 'Assets/ericDesk.png');
    }

    create()
    {
        this.bg = this.add.tileSprite(0,0,gameState.width,gameState.height,'ericDesk').setOrigin(0);
        let playButton = this.add.text(100, 100, "Start Game");
        playButton.setInteractive().on('pointerdown', () => {
            this.scene.stop('Start')
            this.scene.start('First')
        });
        // WebFontConfig = {
        //     google: { families: ["Carter+One", "Stylish"] }
        //     };
        //     (function() {
        //     var wf = document.createElement('script');
        //     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        //     '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        //     wf.type = 'text/javascript';
        //     wf.async = 'true';
        //     var s = document.getElementsByTagName('script')[0];
        //     s.parentNode.insertBefore(wf, s);
        //     })();
    }

    update()
    {

    }
};

class Level extends Phaser.Scene{
    constructor(config)
    {
        super(config)
    }

    preload()
    {
        this.load.image('back', 'Assets/country-platform-files/layers/country-platform-back.png');
        this.load.image('ground', 'Assets/ground.png');
        this.load.image('platform', 'Assets/platform.png');
        this.load.spritesheet('portal', 'Assets/portal.png', {frameWidth:144, frameHeight: 96});
        this.load.spritesheet('eric', 'Assets/eric.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('akali', 'Assets/Akali_walk.png', {frameWidth: 64, frameHeight: 54})

    }

    create()
    {
        //  OBJECT CREATION AND SETUP
        let cam = this.cameras.main;

        this.bg = this.add.tileSprite(0, 0, gameState.width, gameState.height, 'back').setOrigin(0).setScale(1.5);

        let akali = this.physics.add.sprite(createRandomX, createRandomY, 'akali')
        portal = this.physics.add.sprite(gameState.width-40,175,'portal').setScale(.5);
        player = this.physics.add.sprite(0, 175, 'eric');
        ground = this.add.tileSprite(0, 260, gameState.width, 50, 'ground').setOrigin(0);
        platforms = this.physics.add.staticGroup();
        portal = this.physics.add.sprite(gameState.width-40,175,'portal').setScale(.5);
        

        this.children.bringToTop(player)
        
        for (let n = 1; n <= 8; n++)
        {
            platforms.create(n*100, createRandomY(), 'platform')
        }

        this.physics.add.existing(ground);
        ground.enableBody = true;
        ground.body.allowGravity = false;
        ground.body.immovable = true;
        this.physics.add.collider(player, ground);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(portal, ground);
        this.physics.add.collider(akali, ground);
		player.setCollideWorldBounds(true);
        cursors = this.input.keyboard.createCursorKeys();
        //----------------------------

        //      ANIMATIONS
            //  ERIC
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
            //  ENEMIES
        
        this.anims.create({


        })
        //-----------------------------

        //  CAMERA
        cam.startFollow(player, true)
        cam.setBounds(0,0,gameState.width, gameState.height)
        this.physics.world.setBounds(0,0,gameState.width, gameState.height)
        //-----------------------------

        //  HELPER FUNCTIONS
        function createRandomX(){
            return Math.floor(Math.random()*(gameState.width-75)+75)
        }
        function createRandomY(){
            return Math.floor(Math.random()*200+50);
        };
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
            player.setVelocityY(-250);
        }
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
    height: 300
}

const config = {
	type: Phaser.AUTO,
	width: 612,
    height: 220,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NO_CENTER
    },
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			enableBody: true,
		}
	},
	scene: [Start, First, Second]
};

const game = new Phaser.Game(config);
