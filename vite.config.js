import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { slideHTML, wallHTML, headTags, indexJsonLd, DEFAULT_TITLE, DEFAULT_DESC } from './src/render.js';

const data = JSON.parse(readFileSync(new URL('./src/data/products.json', import.meta.url), 'utf-8'));

// Injeta no index.html o HTML estático das faixas (SEO / sem JS).
const ssr = () => ({
  name: 'pesqueiro-ssr',
  transformIndexHtml(html) {
    const nVar = data.produtos.reduce((a, p) => a + p.variacoes, 0);
    return html
      .replaceAll('269', String(nVar))
      .replace('<!--HEAD-->', headTags({
        title: DEFAULT_TITLE, description: DEFAULT_DESC, path: '/',
        image: '/img/chumbada-bola-furada-natural.webp', jsonld: indexJsonLd(data),
      }))
      .replace('<!--WALL-->', wallHTML(data))
      .replace('<!--SLIDES-->', data.produtos.map((p) => slideHTML(p, data)).join('\n'))
      .replace('<!--STATS-->', JSON.stringify({
        produtos: data.produtos.length,
        variacoes: data.produtos.reduce((a, p) => a + p.variacoes, 0),
        linhas: data.categorias.length,
      }).replace(/"/g, '&quot;'));
  },
});

export default defineConfig({ plugins: [ssr()], build: { target: 'es2020' } });
