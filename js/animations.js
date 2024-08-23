export const createAnimations = ({ anims }) => {
    const animations = [
        {
            key: 'mario-idle',
            frames: [{ key: 'mario', frame: 0 }]
        },
        {
            repeat: -1,
            frameRate: 12,
            key: 'mario-walk',
            frames: anims.generateFrameNumbers(
                'mario',
                { start: 1, end: 3 }
            )
        },
        {
            key: 'mario-death',
            frames: [{ key: 'mario', frame: 4 }]
        },
        {
            key: 'mario-jump',
            frames: [{ key: 'mario', frame: 5 }]
        },
    ];

    animations.forEach(
        animation => {
            if (!anims.exists(animation.key)) {
                anims.create(animation);
            }
        }
    );
}