# Otimizações de LCP (Largest Contentful Paint)

## Problema Identificado
- **LCP inicial**: 3.80s → 8.49s (PIOROU com primeira tentativa)
- **Elemento LCP**: `img.object-cover` no hero carousel
- **Meta**: < 2.5s (bom)

## ⚠️ Lições Aprendidas
As otimizações iniciais PIORARAM o LCP devido a:
1. Preload competindo com recursos críticos
2. Imagem externa do Vercel Blob com alta latência
3. Múltiplas imagens renderizadas simultaneamente com opacity
4. Uso de `fill` ao invés de dimensões específicas

## Otimizações Implementadas (v2 - Agressivas)

### 1. Hero Carousel (`components/hero-carousel.tsx`)
- ✅ **CRÍTICO**: Trocada URL externa por imagem local (elimina latência de rede)
- ✅ **CRÍTICO**: Renderiza apenas 1 imagem por vez (não 3 simultaneamente)
- ✅ **CRÍTICO**: Usa `width` e `height` específicos ao invés de `fill` (evita reflow)
- ✅ Removida animação inicial de fade-in
- ✅ Adicionado `priority={true}` na imagem atual
- ✅ Simplificada estrutura do carousel (sem múltiplas divs overlay)
- ✅ Qualidade otimizada para 85 (balanço entre qualidade/tamanho)

### 2. Layout (`app/layout.tsx`)
- ✅ **REMOVIDO**: Preload (estava competindo com recursos críticos)
- ✅ Layout simplificado para carregamento mais rápido

### 3. Next.js Config (`next.config.mjs`)
- ✅ Removido formato AVIF (muito lento para gerar)
- ✅ Mantido apenas WebP (melhor balanço speed/compressão)
- ✅ Reduzidos `deviceSizes` para apenas tamanhos essenciais
- ✅ Aumentado cache TTL para 1 ano (31536000 segundos)
- ✅ Removidas configurações excessivas de otimização

### 4. CSS de Performance (`styles/performance.css`)
- ✅ Simplificadas regras para `.hero-image`
- ✅ Adicionado `contain: layout` para o carousel
- ✅ Removidas regras CSS globais que causavam overhead
- ✅ Removidas propriedades experimentais (content-visibility, etc)

## Impacto Esperado

### Linha do Tempo
- **Inicial**: LCP: **3.80s** ❌
- **Tentativa 1**: LCP: **8.49s** ❌❌ (piorou!)
- **Tentativa 2 (atual)**: LCP esperado: **< 2.0s** ✅✅

## Por Que Deve Funcionar Agora?

1. **Imagem Local**: Elimina 100-500ms de latência de rede
2. **Renderização Única**: Economiza ~30% de GPU/CPU (1 imagem vs 3)
3. **Dimensões Específicas**: Elimina reflow e layout shift
4. **Sem Preload**: Elimina competição por recursos críticos
5. **WebP Otimizado**: Imagens 30-40% menores que JPEG

## Como Medir

### Chrome DevTools
1. Abra DevTools (F12)
2. Vá para a aba **Lighthouse**
3. Selecione "Performance" + "Desktop" ou "Mobile"
4. Clique em "Analyze page load"
5. Verifique a seção "Largest Contentful Paint"

### Performance Panel
1. Abra DevTools (F12)
2. Vá para a aba **Performance**
3. Clique no ícone de reload (Ctrl+Shift+E)
4. Procure pelo marcador "LCP" na timeline
5. Verifique qual elemento foi o LCP

## Próximos Passos (se ainda estiver lento)

Se o LCP ainda estiver acima de 2.5s:

1. ✅ ~~Usar imagem local~~ (já feito)
2. ✅ ~~Adicionar dimensões específicas~~ (já feito)
3. **Adicionar blur placeholder**: `placeholder="blur"` com `blurDataURL`
4. **Pré-otimizar imagens**: Comprimir manualmente as imagens antes de colocar no `/public`
5. **Build de produção**: Testar com `pnpm build && pnpm start`
6. **CDN**: Considerar usar Cloudflare ou similar para cache mais próximo

## Comandos Úteis

```bash
# Verificar performance em produção
pnpm build
pnpm start

# Rodar Lighthouse CI
npx lighthouse http://localhost:3000 --view

# Análise de bundle
npm install -g @next/bundle-analyzer
```

## Recursos Adicionais

- [Web.dev - Optimize LCP](https://web.dev/optimize-lcp/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

