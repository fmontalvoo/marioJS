export const gameControls = ({ keys, mario }) => {
    const isLeftPressed = keys.left.isDown;
    const isRightPressed = keys.right.isDown;
    const isSpacePressed = keys.space.isDown;
    const isTouchingFloor = mario.body.touching.down;

    if (isSpacePressed && isTouchingFloor) {
        mario.anims.play('mario-jump', true);
        mario.setVelocityY(-200);
    }
    else if (isLeftPressed) {
        mario.flipX = true;
        mario.setVelocityX(-150);
        isTouchingFloor && mario.anims.play('mario-walk', true);
    }
    else if (isRightPressed) {
        mario.flipX = false;
        mario.setVelocityX(150);
        isTouchingFloor && mario.anims.play('mario-walk', true);
    }
    else if (isTouchingFloor) {
        mario.setVelocityX(0);
        mario.anims.play('mario-idle', true);
    }
}