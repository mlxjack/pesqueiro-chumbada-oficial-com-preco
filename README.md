# Pesqueiro — Chumbada Oficial

Site de produtos da linha pesqueiro (Vite + GSAP + Lenis). Publicado em https://pesqueiro.chumbada.com.br via GitHub Pages (Actions).

## Como atualizar
Os insumos (CSV da Shopify e artes das faixas) ficam fora do repositório, em `_fontes/` (ignorado):

1. `python scripts/photos.py` — baixa as fotos do CSV e converte as das chumbadas coloridas
2. `python scripts/build_data.py` — gera `src/data/products.json`
3. `python scripts/images.py` — converte as faixas em WebP
4. `npm run build` — gera o site e as páginas estáticas de cada produto (`/produtos/<handle>/`)

O carrinho é o "Minha Seleção" (`selecao.chumbada.com.br/client.js`); o domínio do site precisa estar em `ALLOWED_ORIGINS` do Worker `chumbada-minha-selecao`.
