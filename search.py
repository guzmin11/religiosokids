import sys
with open(r'c:\Users\Cliente\Desktop\pagina modelada\crescendo_com_deus_final.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'colorida' in line.lower() or 'atividades' in line.lower() or 'R$' in line or 'preço' in line.lower() or 'preco' in line.lower() or ' - ' in line:
        print(f"Line {i+1}: {line.strip()[:150]}")
