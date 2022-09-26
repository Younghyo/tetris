console.log('hello world!');

function draw(color) {
    const canvas = document.getElementById('canvas1');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = color;
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
    }
}
// draw();

setInterval(onGameLoop, 200); // 33 milliseconds = ~ 30 frames per sec

let cnt = 0;
function onGameLoop() {
    console.log('tick!');
    if (cnt % 2 == 0) {
        draw('green');
    }
    else {
        draw('red');
    }
    cnt++;
}
