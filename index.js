console.log('hello world!');


const row_board_game = 22;
const col_board_game = 10;

const width_block = 30;
const height_block = 30;


let map = Array.from(Array(row_board_game), () => new Array(col_board_game).fill(0));
map[1][3] = 1;


const color_table = {
    '0': 'pink',
    '1': 'blue',
};


const canvas = document.getElementById('canvas1');

function init() {
    const board_width = col_board_game * width_block;
    const board_height = row_board_game * height_block;
    canvas.width = board_width;
    canvas.height = board_height;
}
init();

function drawBoard() {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        for (let row = 0; row < row_board_game; row++) {
            for (let col = 0; col < col_board_game; col++) {
                const tp = map[row][col];
                const color = color_table[`${tp}`];
                ctx.fillStyle = color;

                let rect = {
                    'x': col * width_block,
                    'width': width_block - 3,
                    'y': row * height_block,
                    'height': height_block - 3
                };

                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                console.log('q');
            }
        }
    }
}
drawBoard();

function draw(color) {
    return;
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

function onKeyDown(e) {
    console.log('down', e.keyCode);
}

function onKeyUp(e) {
    console.log('up', e.keyCode);
}

window.onkeydown = onKeyDown;
window.onkeyup = onKeyUp;

// setInterval(onGameLoop, 200); // 33 milliseconds = ~ 30 frames per sec

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
