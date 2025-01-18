const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

function resizeCanvas() {
    canvas.width = window.innerWidth > 800 ? 800 : window.innerWidth;
    canvas.height = window.innerHeight > 600 ? 600 : window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let wizard = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5
};

let keys = {};

window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    delete keys[e.key];
});

function handleTouch(e) {
    let touch = e.touches[0];
    let rect = canvas.getBoundingClientRect();
    let touchX = touch.clientX - rect.left;
    let touchY = touch.clientY - rect.top;

    wizard.x = touchX - wizard.width / 2;
    wizard.y = touchY - wizard.height / 2;
}

canvas.addEventListener('touchmove', handleTouch);

function update() {
    if (keys['ArrowLeft'] && wizard.x > 0) {
        wizard.x -= wizard.speed;
    }
    if (keys['ArrowRight'] && wizard.x + wizard.width < canvas.width) {
        wizard.x += wizard.speed;
    }
    if (keys['ArrowUp'] && wizard.y > 0) {
        wizard.y -= wizard.speed;
    }
    if (keys['ArrowDown'] && wizard.y + wizard.height < canvas.height) {
        wizard.y += wizard.speed;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = wizard.color;
    ctx.fillRect(wizard.x, wizard.y, wizard.width, wizard.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

startButton.addEventListener('click', function () {
    startButton.style.display = 'none';
    gameLoop();
});