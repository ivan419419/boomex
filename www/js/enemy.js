
// ==================== ENEMY.JS - INTELIGÊNCIA ARTIFICIAL DOS INIMIGOS ====================

export class Enemy {
    constructor(x, y, tileSize) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.size = 24; // Tamanho de colisão do monstro
        this.speed = 1.5; // Velocidade de patrulha mais lenta que o jogador
        
        // Direções: 1 = Direita, 2 = Esquerda, 3 = Cima, 4 = Baixo
        this.direction = Math.floor(Math.random() * 4) + 1; 
    }

    update(map) {
        let nextX = this.x;
        let nextY = this.y;

        // Tenta mover na direção atual
        switch(this.direction) {
            case 1: nextX += this.speed; break; // direita
            case 2: nextX -= this.speed; break; // esquerda
            case 3: nextY -= this.speed; break; // cima
            case 4: nextY += this.speed; break; // baixo
        }

        // Função de checagem de colisão com barreiras
        const checkCollision = (targetX, targetY) => {
            const col = Math.floor(targetX / this.tileSize);
            const row = Math.floor(targetY / this.tileSize);
            if (row < 0 || row >= map.length || col < 0 || col >= map.length) return true;
            // Bate na parede cinza (1) ou no tijolo roxo (2)
            return map[row][col] === 1 || map[row][col] === 2;
        };

        const offset = this.size / 2;
        let collided = false;

        // Verifica colisão baseado no eixo atual de movimento
        if (this.direction === 1 || this.direction === 2) {
            collided = checkCollision(nextX - offset, this.y - offset) ||
                       checkCollision(nextX + offset, this.y - offset) ||
                       checkCollision(nextX - offset, this.y + offset) ||
                       checkCollision(nextX + offset, this.y + offset);
        } else {
            collided = checkCollision(this.x - offset, nextY - offset) ||
                       checkCollision(this.x + offset, nextY - offset) ||
                       checkCollision(this.x - offset, nextY + offset) ||
                       checkCollision(this.x + offset, nextY + offset);
        }

        if (!collided) {
            // Se o caminho estiver livre, o inimigo avança
            this.x = nextX;
            this.y = nextY;
        } else {
            // Se bater na parede, escolhe uma nova direção aleatória na hora!
            this.direction = Math.floor(Math.random() * 4) + 1;
        }
    }

    draw(ctx) {
        // Desenha um monstrinho temporário (Círculo laranja com olhinhos brancos)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fa8231"; 
        ctx.fill();
        ctx.closePath();

        // Olho Esquerdo
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x - 6, this.y - 4, 3, 3);
        // Olho Direito
        ctx.fillRect(this.x + 3, this.y - 4, 3, 3);
    }
}

