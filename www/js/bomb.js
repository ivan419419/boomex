// ==================== BOMB.JS — CORRIGIDO ====================
export class Bomb {
    constructor(x, y, col, row) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.row = row;
        this.timer = 2500;
        this.isExploded = false;
        this.explosionTimer = 500;
        this.radius = 2;
        this.affectedTiles = [];
        this.tileSize = 32;
    }

    update(deltaTime, map, enemies) {
        if (!this.isExploded) {
            this.timer -= deltaTime;
            if (this.timer <= 0) {
                this.isExploded = true;
                this.explode(map, enemies);
            }
        } else {
            this.explosionTimer -= deltaTime;
        }
    }

    explode(map, enemies) {
        this.affectedTiles.push({ row: this.row, col: this.col });
        const directions = [[-1,0],[1,0],[0,-1],[0,1]];

        directions.forEach(([dRow, dCol]) => {
            for (let i = 1; i <= this.radius; i++) {
                const tr = this.row + (dRow * i);
                const tc = this.col + (dCol * i);
                if (tr < 0 || tr >= map.length || tc < 0 || tc >= map[0].length) break;
                if (map[tr][tc] === 1) break;
                if (map[tr][tc] === 2) {
                    map[tr][tc] = 0;
                    this.affectedTiles.push({ row: tr, col: tc });
                    break;
                }
                if (map[tr][tc] === 0) {
                    this.affectedTiles.push({ row: tr, col: tc });
                }
            }
        });

        // Eliminar inimigos na explosão
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            const eCol = Math.floor(e.x / this.tileSize);
            const eRow = Math.floor(e.y / this.tileSize);
            const hit = this.affectedTiles.some(t => t.row === eRow && t.col === eCol);
            if (hit) enemies.splice(i, 1);
        }
    }

    draw(ctx, tileSize) {
        if (!this.isExploded) {
            const cx = this.col * tileSize + tileSize/2;
            const cy = this.row * tileSize + tileSize/2;
            ctx.beginPath();
            ctx.arc(cx, cy, tileSize/3, 0, Math.PI*2);
            ctx.fillStyle = "#3d3d5c";
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cx, cy - tileSize/3);
            ctx.lineTo(cx + 4, cy - tileSize/2);
            ctx.strokeStyle = Math.random()>0.5 ? "#ff4757" : "#ffa502";
            ctx.lineWidth = 3;
            ctx.stroke();
        } else {
            ctx.fillStyle = "#ffa502";
            this.affectedTiles.forEach(t => {
                ctx.fillRect(t.col*tileSize+2, t.row*tileSize+2, tileSize-4, tileSize-4);
            });
        }
    }
}
