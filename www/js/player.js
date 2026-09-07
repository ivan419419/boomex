// ==================== PLAYER.JS - BOMBERMAN SPRITE SHEET ====================
// Usa sprite sheet (Idle + Walk + Bomb)

const player = {
    x: 200,
    y: 200,
    speed: 4.5,
    size: 32,
    direction: 0,           // 0 = parado, 1 = direita, 2 = esquerda, 3 = cima, 4 = baixo
    frame: 0,
    isMoving: false,
    isHoldingBomb: false
};

let sprites = {
    idle: null,
    walk: null,
    bomb: null
};

// ==================== CARREGAR SPRITES ====================
function loadSprites() {
    sprites.idle = new Image();
    sprites.idle.src = "assets-raw/sprites/bomberman_idle.png";
    
    sprites.walk = new Image();
    sprites.walk.src = "assets-raw/sprites/bomberman_walk.png";
    
    sprites.bomb = new Image();
    sprites.bomb.src = "assets-raw/sprites/bomberman_bomb.png";
}

// ==================== CONTROLES POR TOQUE ====================
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    player.startX = touch.clientX;
    player.startY = touch.clientY;
    player.isMoving = true;
    player.isHoldingBomb = false;
}

function handleTouchMove(e) {
    if (!player.isMoving) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - player.startX;
    const deltaY = touch.clientY - player.startY;
    
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    if (absX > absY) {
        player.direction = deltaX > 0 ? 1 : 2;
    } else {
        player.direction = deltaY > 0 ? 4 : 3;
    }
    
    updatePlayerPosition();
}

function handleTouchEnd(e) {
    player.isMoving = false;
    player.direction = 0;
    if (Math.abs(e.changedTouches[0].clientX - player.x) < 30 && 
        Math.abs(e.changedTouches[0].clientY - player.y) < 30) {
        player.isHoldingBomb = true;
    }
}

// ==================== MOVIMENTO ====================
function updatePlayerPosition() {
    switch(player.direction) {
        case 1: player.x += player.speed; break;   // direita
        case 2: player.x -= player.speed; break;   // esquerda
        case 3: player.y -= player.speed; break;   // cima
        case 4: player.y += player.speed; break;   // baixo
    }
    
    // Limites da tela
    const minX = 16;
    const maxX = canvas.width - 16;
    const minY = 16;
    const maxY = canvas.height - 16;
    
    player.x = Math.max(minX, Math.min(maxX, player.x));
    player.y = Math.max(minY, Math.min(maxY, player.y));
}

// ==================== DESENHO ====================
function drawPlayer() {
    let sprite = sprites.idle;
    const animationSpeed = player.isMoving ? 6 : 0;
    
    if (player.isHoldingBomb) {
        sprite = sprites.bomb;
    } else if (player.isMoving) {
        sprite = sprites.walk;
        player.frame = (player.frame + animationSpeed) % 8;
    }
    
    const sx = player.frame * 64;   // animação de andar
    
    ctx.drawImage(sprite, sx, 0, 64, 64, player.x - 32, player.y - 32, 64, 64);
}

// ==================== UPDATE PRINCIPAL ====================
function updatePlayer() {
    if (player.isMoving) {
        updatePlayerPosition();
    }
    drawPlayer();
}

// ==================== INICIALIZAÇÃO ====================
function initPlayer() {
    loadSprites();
    updatePlayer();
}

export { player, updatePlayer, initPlayer };