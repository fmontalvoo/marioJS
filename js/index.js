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

    this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks')
        .setOrigin(0, 0);

    this.add.sprite(50, 195, 'mario')
        .setOrigin(0, 0);
}

function update() {

}