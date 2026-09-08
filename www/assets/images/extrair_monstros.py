from PIL import Image
import os

# Abre a folha original
arquivos = [f for f in os.listdir('.') if f.startswith('Game Boy')]
if not arquivos:
    print("❌ Folha de sprites não encontrada!")
    exit()

img = Image.open(arquivos[0]).convert("RGBA")

# Pasta de destino
pasta = "boomex/www/assets/images"
os.makedirs(pasta, exist_ok=True)

# 🎯 Monstro 1 — Bomberman inimigo clássico (posição na folha)
# Linha dos monstros: aprox. Y=220, X=440
monstro1 = img.crop((440, 220, 456, 236))
monstro1 = monstro1.resize((32, 32), Image.Resampling.NEAREST)
monstro1.save(f"{pasta}/monstro1.png", "PNG")

# 🎯 Monstro 2 — variação
monstro2 = img.crop((458, 220, 474, 236))
monstro2 = monstro2.resize((32, 32), Image.Resampling.NEAREST)
monstro2.save(f"{pasta}/monstro2.png", "PNG")

# 🎯 Monstro 3 — variação
monstro3 = img.crop((476, 220, 492, 236))
monstro3 = monstro3.resize((32, 32), Image.Resampling.NEAREST)
monstro3.save(f"{pasta}/monstro3.png", "PNG")

print("✅ MONSTROS PRONTOS! → monstro1.png, monstro2.png, monstro3.png")
