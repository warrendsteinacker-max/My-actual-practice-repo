////for my project, I am makeing a cod zombies map tranzit

////not sure how three.js works but if I were to create controls myself for player, I would use a switch stament that has the event passed down to it and useing key word key

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const onKeyDown = function (event) {
    switch (event.key) {
        case 'w':
            moveForward = true;
            break;
        case 'a':
            moveLeft = true;
            break;
        case 's':
            moveBackward = true;
            break;
        case 'd':
            moveRight = true;
            break;
    }
};

const onKeyUp = function (event) {
    switch (event.key) {
        case 'w':
            moveForward = false;
            break;
        case 'a':
            moveLeft = false;
            break;
        case 's':
            moveBackward = false;
            break;
        case 'd':
            moveRight = false;
            break;
    }
};

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

// In your animation loop, you can then apply these movements:
function animate() {
    requestAnimationFrame(animate);

    if (moveForward) player.position.z -= 1;
    if (moveBackward) player.position.z += 1;
    if (moveLeft) player.position.x -= 1;
    if (moveRight) player.position.x += 1;

    renderer.render(scene, camera);
}

animate();