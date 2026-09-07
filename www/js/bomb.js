// ==================== BOMB.JS ====================
// Sistema de bombas - Bomberman clássico

const bombs = [];

// ==================== CRIAR BOMBA ====================
function createBomb(x, y) {
    bombs.push({
        x: Math.floor(x / 32) * 32 + 16,   // centralizado no tile
        y: Math.floor(y / 32) * 32 + 16,
        timer: 2500,                       // 2.5 segundos
        radius: 1.5
    });
}

// ==================== ATUALIZAR BOMBAS ====================
function updateBombs() {
    for (let i = bombs.length - 1; i >= 0; i--) {
        const bomb = bombs[i];
        bomb.timer -= 16; // frame de 60fps
        
        // Tempo acabou = explode
        if (bomb.timer <= 0) {
            explodeBomb(i);
            bombs.splice(i, 1);
        }
    }
}

// ==================== EXPLOSÃO ====================
function explodeBomb(index) {
    const bomb = bombs[index];
    const radius = bomb.radius * 32;
    
    // Pinta a explosão na tela
    ctx.fillStyle = "rgba(255, 165, 0, 0.9)";
    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Centro da explosão
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Círculos de onda (efeito clássico)
    for (let i = 1; i <= 3; i++) {
        ctx.strokeStyle = "rgba(255, 200, 50, 0.6)";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(bomb.x, bomb.y, radius * (i / 3), 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // ==================== COLISÃO ====================
    // Destrói paredes em um raio
    const startX = Math.floor((bomb.x - radius) / 32);
    const startY = Math.floor((bomb.y - radius) / 32);
    const endX = Math.floor((bomb.x + radius) / 32);
    const endY = Math.floor((bomb.y + radius) / 32);
    
    for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
            if (x >= 0 && x < columns && y >= 0 && y < rows) {
                // Destrói parede (1 -> 0)
                if (map[y][x] === 1) {
                    map[y][x] = 0;
                }
                
                // Destrói jogador se estiver no raio
                const dx = player.x - bomb.x;
                const dy = player.y - bomb.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < radius && dist > 5) {
                    console.log("💥 JOGADOR MORREU!");
                    // Aqui você pode adicionar tela de game over depois
                }
            }
        }
    }
}

// ==================== FUNÇÃO PRINCIPAL ====================
function updateBombs() {
    updateBombs();
}

export { createBomb, updateBombs };