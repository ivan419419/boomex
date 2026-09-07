// ==================== MAIN.JS - BOOMEX ====================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let tileSize = 32;
let columns = 12;
let rows = 12;

// Labirinto (1 = parede, 0 = chão)
let map = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,1],
    [1,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
];

// ==================== PLAYER ====================
import { player, updatePlayer, initPlayer } from './player.js';

// ==================== FUNÇÃO DE DESENHO ====================
function drawMap() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            const tile = map[y][x];
            
            if (tile === 1) {
                ctx.fillStyle = "#555566";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                ctx.fillStyle = "#444455";
                ctx.fillRect(x * tileSize + 4, y * tileSize + 4, tileSize - 8, tileSize - 8);
            } else {
                ctx.fillStyle = "#2a2a3a";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}

// ==================== LOOP PRINCIPAL ====================
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

// ==================== INICIALIZAÇÃO ====================
function init() {
    initPlayer();
    gameLoop();
}

// ==================== INICIA O JOGO ====================
init();