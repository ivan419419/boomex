from PIL import Image
import os

# 1. Abre a folha mãe que você baixou (confirmando o nome exato)
nome_arquivo = "Game Boy _ GBC - Pocket Bomberman.png"

if not os.path.exists(nome_arquivo):
    # Procura por qualquer PNG que comece com Game Boy caso o nome mude um pouco
    arquivos = [f for f in os.listdir('.') if f.startswith('Game Boy')]
    if arquivos:
        nome_arquivo = arquivos[0]
    else:
        print("❌ Arquivo original não encontrado na pasta Download!")
        exit()

img = Image.open(nome_arquivo).convert("RGBA")

# 2. Vamos criar a imagem final de 256x64 transparente
imagem_final = Image.new("RGBA", (256, 64), (0, 0, 0, 0))

# 3. Mapeamento dos 4 primeiros frames da folha original (Posições X exatas dos bonecos)
# O primeiro boneco começa em X=1, o segundo em X=18, o terceiro em X=35... (pulando a bordinha)
posicoes_x = [1, 18, 35, 52]

for i, x_inicio in enumerate(posicoes_x):
    # Recorta o bonequinho de 16x16 na primeira linha (Y=2 até Y=18 para pular a borda do topo)
    caixa_recorte = (x_inicio, 2, x_inicio + 16, 18)
    boneco_pequeno = img.crop(caixa_recorte)
    
    # Amplia o boneco de 16x16 para 64x64 usando o filtro Pixel Art perfeito (NEAREST)
    boneco_grande = boneco_pequeno.resize((64, 64), Image.Resampling.NEAREST)
    
    # Cola o boneco grande na posição correta da tirinha (0, 64, 128, 192)
    imagem_final.paste(boneco_grande, (i * 64, 0))

# 4. Salva direto na pasta certa do seu jogo do Acode!
pasta_destino = "boomex/www/assets/images"
os.makedirs(pasta_destino, exist_ok=True)
caminho_final = os.path.join(pasta_destino, "bomberman_walk.png")

imagem_final.save(caminho_final, "PNG")
print(f"✅ Sucesso! Sprite sheet fatiada e salva em: {caminho_final}")
