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
}

function create() {
    console.info('Create');

    this.add.image(100, 50, 'cloud1')
        .setOrigin(0, 0)
        .setScale(0.15);

    this.floor = this.physics.add.staticGroup();
    this.floor.create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5);

    this.mario = this.physics.add.sprite(50, 190, 'mario')
        .setOrigin(0, 0);

    this.physics.add.collider(this.mario, this.floor);

    this.anims.create({
        repeat: -1,
        frameRate: 12,
        key: 'mario-walk',
        frames: this.anims.generateFrameNumbers(
            'mario',
            { start: 1, end: 3 }
        ),
    });

    this.anims.create({
        key: 'mario-idle',
        frames: [{ key: 'mario', frame: 0 }]
    });

    this.keys = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.keys.left.isDown) {
        this.mario.x -= 2;
        this.mario.flipX = true;
        this.mario.anims.play('mario-walk', true);
    }
    else if (this.keys.right.isDown) {
        this.mario.x += 2;
        this.mario.flipX = false;
        this.mario.anims.play('mario-walk', true);
    }
    else {
        this.mario.anims.play('mario-idle', true);
    }
}