// console.log('hello world!');


const row_board_game = 22;
const col_board_game = 10;

const width_block = 30;
const height_block = 30;

const meta_move = {
    'down': {
        'row': 1,
        'col': 0,
        'rows': Array.from({ length: row_board_game }, (x, i) => i).reverse(),
        'cols': Array.from({ length: col_board_game }, (x, i) => i),
    },
    'left': {
        'row': 0,
        'col': -1,
        'rows': Array.from({ length: row_board_game }, (x, i) => i),
        'cols': Array.from({ length: col_board_game }, (x, i) => i),
    },
    'right': {
        'row': 0,
        'col': 1,
        'rows': Array.from({ length: row_board_game }, (x, i) => i),
        'cols': Array.from({ length: col_board_game }, (x, i) => i).reverse(),
    },
}

let map = Array.from(Array(row_board_game), () => new Array(col_board_game).fill('empty'));
newBlock();

const color_table = {
    'empty': 'pink',
    'falling': 'blue',
    'fallen': 'black'
};


const canvas = document.getElementById('canvas1');


function drawBoard() {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        for (let row = 0; row < row_board_game; row++) {
            for (let col = 0; col < col_board_game; col++) {
                const tp = map[row][col];
                const color = color_table[tp];
                ctx.fillStyle = color;

                let rect = {
                    'x': col * width_block,
                    'width': width_block - 3,

                    'y': row * height_block,
                    'height': height_block - 3
                };

                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            }
        }
    }
}

function onKeyDown(e) {
    // console.log('down', e.keyCode);
    switch (e.keyCode) {
        case 40:
            onGameLoop();
            break;
        case 32:
            blocksToGround();
            drawBoard();
            break;
        case 37:
            doMove('left');
            drawBoard();
            break;
        case 39:
            doMove('right');
            drawBoard();
            break;
    }
}

function onKeyUp(e) {
    // console.log('up', e.keyCode);
}

function blocksToGround() {
    while (doMove('down')) {
    }
    freezeBlocks();
    newBlock();
}

function onGameLoop() {
    // console.log('tick!');
    if (doMove('down')) {
    }
    else {
        freezeBlocks();
        newBlock();
    }
    drawBoard();
}

function newBlock() {
    map[1][3] = 'falling';
}

function insideBoard(row, col) {
    if (row < 0) return false;
    if (col < 0) return false;
    if (row >= row_board_game) return false;
    if (col >= col_board_game) return false;
    return true;
}

function doMove(dir) {
    let stepped = false;
    for (let q of meta_move[dir]['rows']) {
        for (let w of meta_move[dir]['cols']) {
            const q_n = q + meta_move[dir]['row'];
            const w_n = w + meta_move[dir]['col'];
            if (!insideBoard(q_n, w_n))
                continue;
            // console.log(q, w, q_n, w_n);

            if (map[q][w] == 'falling') {
                if (map[q_n][w_n] == 'empty') {
                    map[q_n][w_n] = 'falling';
                    map[q][w] = 'empty';
                    stepped = true;
                    // debugger;
                }
            }
        }
    }
    return stepped;
}

function freezeBlocks() {
    for (let q = 0; q < row_board_game; q++) {
        for (let w = 0; w < col_board_game; w++) {
            if (map[q][w] == 'falling') {
                map[q][w] = 'fallen';
            }
        }
    }
}

function init() {
    window.onkeydown = onKeyDown;
    window.onkeyup = onKeyUp;

    const board_width = col_board_game * width_block;
    const board_height = row_board_game * height_block;
    canvas.width = board_width;
    canvas.height = board_height;

    drawBoard();
    setInterval(onGameLoop, 1000);
}
init();
