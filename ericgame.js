
var WebFontConfig
var platforms; 
var cursors;
var ground;
var portal;
var player;
var akali;
var cam;


class Start extends Phaser.Scene{
    constructor(config)
    {
        super(config, {key: 'Start'})
    }

    preload()
    {
        this.load.image('ericDesk', 'Assets/ericDesk');
        // this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        // this.load.spritesheet('ericDesk', 'Assets/ericDeskAni.png', {frameWidth: 600, frameHeight: 338});
    }

    create()
    {
        // WebFontConfig = {
        //     google: { families: ["Carter+One", "Stylish"] }
        //     };
        //     (function() {
        //     let wf = document.createElement('script');
        //     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        //     '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        //     wf.type = 'text/javascript';
        //     wf.async = 'true';
        //     let s = document.getElementsByTagName('script')[0];
        //     s.parentNode.insertBefore(wf, s);
        //     })();

        this.bg = this.add.tileSprite(0,0,gameState.width,gameState.height,'ericDesk').setOrigin(0);
        // this.bg = this.add.sprite(300,169,'ericDesk')
        // this.anims.create({
        //     key: 'bg',
        //     frames: this.anims.generateFrameNumbers('ericDesk', {start: 0, end: 31}),
        //     frameRate: 6,
        //     repeat: 0
        // });
        // this.bg.anims.play('bg', true);
        
        this.playButton = this.add.text(195, 175, "Start Game").setScale(1.5);
        this.playButton.setInteractive().on('pointerdown', () => {
            this.scene.stop('Start')
            this.scene.start('First')
        });
        this.add.text(205, 135, "The Tale \n    of Eric")
    }

    update()
    {
        // document.querySelector("canvas").style.opacity = '.6'
    }
};

class Level extends Phaser.Scene{
    constructor(config)
    {
        super(config)
    }

    preload()
    {
        this.load.image('back', 'Assets/country-platform-files/layers/country-platform-back2.png');
        this.load.image('ground', 'Assets/ground.png');
        this.load.image('platform', 'Assets/platform.png');
        this.load.spritesheet('portal', 'Assets/portal.png', {frameWidth:144, frameHeight: 96});
        this.load.spritesheet('eric', 'Assets/eric.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('akali', 'Assets/Akali_walk.png', {frameWidth: 64, frameHeight: 54});
        // fetch('localhost/eric/tale-of-eric-backend/db/enemies.db')
        // .then(resp => resp.json())
        // .then(json.forEach((akali) => {loadakali(akali)}))
    }

    create()
    {
        //  OBJECT CREATION AND SETUP

        cam = this.cameras.main;
        this.bg = this.add.tileSprite(0, 0, gameState.width, gameState.height, 'back').setOrigin(0).setScale(1.5);
        akali = this.physics.add.sprite(50, gameState.height-50, 'akali').setScale(.75);
        portal = this.physics.add.sprite(gameState.width-40,gameState.height-50,'portal').setScale(.5);
        player = this.physics.add.sprite(0, gameState.height-50, 'eric');
        ground = this.add.tileSprite(0, gameState.height-30, gameState.width, 50, 'ground').setOrigin(0);
        platforms = this.physics.add.staticGroup();
        this.children.bringToTop(player);
        
        for (let n = 1; n <= 18; n++)
        {
            platforms.create(n*100, createRandomY(), 'platform')
        }

        this.physics.add.existing(ground);
        ground.enableBody = true;
        ground.body.allowGravity = false;
        ground.body.immovable = true;
        this.physics.add.collider(player, ground);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(akali, platforms);
        this.physics.add.collider(portal, ground);
        this.physics.add.collider(akali, ground);
        player.setCollideWorldBounds(true);
        akali.setCollideWorldBounds(true);
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
            frameRate: 6
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('eric', { start: 4, end: 6 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'fall',
            frames: [ { key: 'eric', frame: 8 } ],
            frameRate: 6
        });

        this.anims.create({
            key: 'crouch',
            frames: [ { key: 'eric', frame: 7 } ],
            frameRate: 6
        });

            //  ENEMIES
        
            this.anims.create({
                key: 'turn',
                frames: [ { key: 'akali', frame: 0 } ],
                frameRate: 6
            });
        
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('akali', { start: 1, end: 2 }),
                frameRate: 6,
                repeat: -1
            });
    
            // this.anims.create({
            //     key: 'fall',
            //     frames: [ { key: 'akali', frame: 8 } ],
            //     frameRate: 6
            // });
    
            // this.anims.create({
            //     key: 'crouch',
            //     frames: [ { key: 'akali', frame: 7 } ],
            //     frameRate: 6
            // });
        //-----------------------------

        //  CAMERA
        cam.startFollow(player, true);
        cam.setBounds(0,0,gameState.width, gameState.height);
        this.physics.world.setBounds(0,0,gameState.width, gameState.height);
        //-----------------------------

        //  HELPER FUNCTIONS
        function createRandomX(){
            return Math.floor(Math.random()*(gameState.width-75)+100);
        };
        function createRandomY(){
            return Math.floor(Math.random()*(gameState.height-175)+100);
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
        } else if (cursors.down.isDown && player.body.touching.down){
            player.anims.play('crouch')
        } else if (player.body.touching.down) {
            player.setVelocityX(0);
            player.anims.play('turn')
        }
        if (player.body.velocity.y > 0){
            player.anims.play('fall')
        }
        if (cursors.space.isDown && player.body.touching.down) {
            player.setVelocityY(-250);
        }

        if (this.physics.arcade.distanceBetween(akali, player) < 600) {

            // if player to left of akali AND akali moving to right (or not moving)
            if (player.x < akali.x && akali.body.velocity.x >= 0) {
                // move akali to left
                akali.body.velocity.x = -150;
                this.anims.playReverse('right')
            }
            // if player to right of akali AND akali moving to left (or not moving)
            else if (player.x > akali.x && akali.body.velocity.x <= 0) {
                // move akali to right
                akali.body.velocity.x = 150;
                this.anims.play('right')
            }
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
    width: 2000,
    height: 500
}

const config = {
	type: Phaser.AUTO,
	width: 1000,
    height: 300,
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

class Enemy{
    constructor(health, damage)
    {
        this.health= health;
        this.damage= damage;
    }
}

class Boss extends Enemy{
    constructor(){
        super(health, damage);
        this.skill = skill;
    }
}
// function loadakali(eData){
    // return this.load.spritesheet(`akali${eData.id}`, `${eData.image}`);
// }
