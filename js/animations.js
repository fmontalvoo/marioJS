export const createAnimations = (game) => {
    console.log(game);
    game.anims.create({
        repeat: -1,
        frameRate: 12,
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 1, end: 3 }
        ),
    });

    game.anims.create({
        key: 'mario-idle',
        frames: [{ key: 'mario', frame: 0 }]
    });

    game.anims.create({
        key: 'mario-jump',
        frames: [{ key: 'mario', frame: 5 }]
    });

    game.anims.create({
        key: 'mario-death',
        frames: [{ key: 'mario', frame: 4 }]
    });
}