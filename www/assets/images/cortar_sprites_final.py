from PIL import Image
import os

# ✅ Usa o nome curto que já existe na pasta
img_path = "spritesheet_full.gif"
output_folder = "sprites_cortados"

# 🎯 Tamanho original dos sprites do Game Boy = 16×16
tile_w, tile_h = 16, 16

os.makedirs(output_folder, exist_ok=True)

try:
    img = Image.open(img_path)
    print(f"✅ Arquivo aberto: {img_path}")
    print(f"📐 Tamanho da folha: {img.size[0]} × {img.size[1]} px")
    
    # Pega o quadro principal do GIF
    if hasattr(img, 'n_frames') and img.n_frames > 1:
        print(f"📋 GIF animado com {img.n_frames} quadros → usando quadro 0")
        img.seek(0)
    
    # Converte mantendo transparência
    img = img.convert("RGBA")
    w, h = img.size
    contador = 0

    # 🔁 Percorre toda a imagem em grade de 16×16
    for y in range(0, h, tile_h):
        for x in range(0, w, tile_w):
            tile = img.crop((x, y, x + tile_w, y + tile_h))
            # Só salva se não estiver vazio
            if tile.getbbox():
                tile.save(f"{output_folder}/sprite_{contador:03d}.png")
                contador += 1

    print(f"\n🎉 PRONTO! {contador} sprites recortados em: {output_folder}/")
    print(f"📂 Pasta: {os.path.abspath(output_folder)}")

except FileNotFoundError:
    print(f"\n❌ ERRO: Arquivo '{img_path}' não encontrado!")
except Exception as e:
    print(f"❌ Erro: {e}")
