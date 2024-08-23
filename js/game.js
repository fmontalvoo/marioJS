import { gameControls } from './controls.js';
import { createAnimations } from './animations.js';

const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    parent: 'game',
    backgroundColor: '#049cd8',
    scene: {
        preload, // Se ejecuta para cargar recursos
        create, // Se ejecutan cuando comienza el juego
        update // Se ejecuta en cada frame
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 300 }
        }
    }
};

const game = new Phaser.Game(config);

function preload() {
    console.info('Preload');

    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    );

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    );

    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        {
            frameWidth: 18,
            frameHeight: 16
        }
    );

    this.load.audio(
        'gameover',
        'assets/sound/music/gameover.mp3'
    );
}

function create() {
    console.info('Create');

    this.add.image(100, 50, 'cloud1')
        .setOrigin(0, 0)
        .setScale(0.15);

    this.floor = this.physics.add.staticGroup();
    this.floor.create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody();

    this.floor.create(180, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody();

    this.mario = this.physics.add.sprite(50, 190, 'mario')
        .setOrigin(0, 1)
        .setGravityY(300)
        .setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, 512, config.height);
    this.physics.add.collider(this.mario, this.floor);

    this.cameras.main.setBounds(0, 0, 2000, config.height);
    this.cameras.main.startFollow(this.mario);

    createAnimations(this);

    this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
    const { mario } = this;

    if (mario.isDead)
        return;

    gameControls(this);

    if (mario.y >= config.height) {
        mario.isDead = true;
        mario.setVelocity(0, 0);
        this.sound.play('gameover');
        mario.setCollideWorldBounds(false);
        mario.anims.play('mario-death', true);
        setTimeout(() => mario.setVelocityY(-350), 100);
        setTimeout(() => this.scene.restart(), 2000);
    }
}