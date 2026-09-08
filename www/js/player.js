// ==================== PLAYER.JS — CORRIGIDO ====================
import { canvas, ctx } from './canvas.js';

const player = {
    x: 2 * 32 + 16,
    y: 2 * 32 + 16,
    speed: 4.5,
    size: 32,
    lives: 3,
    isDead: false,
    direction: 0,
    frame: 0,
    isMoving: false,
    isHoldingBomb: false,
    startX: 0,
    startY: 0
};

let sprites = { idle: null, walk: null, bomb: null };

// ✅ CAMINHO CORRIGIDO — assets/images/ (igual sua estrutura!)
function loadSprites() {
    sprites.idle = new Image();
    sprites.idle.src = "assets/images/bomberman_walk.png"; // ← usar existente
    sprites.idle.onload = () => console.log("✅ Idle carregado!");
    sprites.idle.onerror = () => console.error("❌ Idle falhou!");

    sprites.walk = new Image();
    sprites.walk.src = "assets/images/bomberman_walk.png";
    sprites.walk.onload = () => console.log("✅ Walk carregado!");
    sprites.walk.onerror = () => console.error("❌ Walk falhou!");

    sprites.bomb = new Image();
    sprites.bomb.src = "assets/images/bomb.png";
    sprites.bomb.onload = () => console.log("✅ Bomb carregado!");
    sprites.bomb.onerror = () => console.error("❌ Bomb falhou!");
}

function handleTouchStart(e) {
    e.preventDefault();
    if (player.isDead) return;
    const touch = e.touches[0];
    player.startX = touch.clientX;
    player.startY = touch.clientY;
    player.isMoving = true;
    player.isHoldingBomb = false;
}

function handleTouchMove(e) {
    if (!player.isMoving || player.isDead) return;
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - player.startX;
    const deltaY = touch.clientY - player.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    player.direction = absX > absY ? (deltaX > 0 ? 1 : 2) : (deltaY > 0 ? 4 : 3);
    updatePlayerPosition();
}

function handleTouchEnd(e) {
    if (player.isDead) return;
    player.isMoving = false;
    player.direction = 0;
}

function updatePlayerPosition() {
    if (player.isDead) return;
    switch(player.direction) {
        case 1: player.x += player.speed; break;
        case 2: player.x -= player.speed; break;
        case 3: player.y -= player.speed; break;
        case 4: player.y += player.speed; break;
    }
    player.x = Math.max(32, Math.min(canvas.width - 32, player.x));
    player.y = Math.max(32, Math.min(canvas.height - 32, player.y));
}

function drawPlayer() {
    if (player.isDead) return;
    let sprite = sprites.idle;
    if (player.isMoving) {
        sprite = sprites.walk;
        player.frame = (player.frame + 0.15) % 4;
    }
    if (sprite && sprite.complete) {
        const sx = Math.floor(player.frame) * 32;
        ctx.drawImage(sprite, sx, 0, 32, 32, player.x - 16, player.y - 16, 32, 32);
    } else {
        ctx.fillStyle = "#c8102e";
        ctx.fillRect(player.x - 12, player.y - 16, 24, 32);
    }
}

function updatePlayer() {
    if (player.isMoving) updatePlayerPosition();
    drawPlayer();
}

export function takeDamage() {
    if (player.isDead) return;
    player.lives--;
    if (player.lives <= 0) {
        player.isDead = true;
        alert("💥 GAME OVER! Tente novamente!");
        setTimeout(() => window.location.reload(), 1500);
    } else {
        player.x = 2 * 32 + 16;
        player.y = 2 * 32 + 16;
        player.direction = 0;
        player.isMoving = false;
    }
}

function initPlayer() {
    loadSprites();
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
}

export { player, updatePlayer, initPlayer };
