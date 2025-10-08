# 📸 Guia de Upload de Imagens - Dashboard Admin

## ✨ Funcionalidades Implementadas

### 1. **Upload de Múltiplas Imagens**
- ✅ Faça upload de várias imagens por vez
- ✅ Cada imagem é convertida para base64 e armazenada no localStorage
- ✅ Suporta formatos: JPG, PNG, WebP, GIF
- ✅ Limite de 2MB por imagem

### 2. **Seleção de Imagem de Capa**
- ✅ Escolha qual imagem será a capa do card
- ✅ A imagem de capa é destacada com um badge amarelo ⭐
- ✅ Clique no ícone de estrela para definir outra imagem como capa
- ✅ A imagem de capa é usada automaticamente como imagem principal

### 3. **Gerenciamento de Galeria**
- ✅ Visualização em grid de todas as imagens
- ✅ Remova imagens individuais com o botão X
- ✅ Numeração automática das imagens
- ✅ Preview instantâneo

## 📖 Como Usar

### Adicionando Imagens a um Imóvel

1. **Acesse o Admin**
   - Faça login em `/admin` (usuário: `admin`, senha: `admin`)

2. **Crie ou Edite um Imóvel**
   - Clique em "Adicionar Novo Imóvel" ou no botão de editar de um imóvel existente

3. **Faça Upload das Imagens**
   - Localize a seção "Galeria de Imagens"
   - Clique em "Adicionar Imagens"
   - Selecione uma ou várias imagens do seu computador
   - Aguarde o processamento (conversão para base64)

4. **Defina a Imagem de Capa**
   - Por padrão, a primeira imagem é a capa
   - Para mudar, clique no ícone de estrela ⭐ em outra imagem
   - A imagem de capa terá um badge amarelo "Capa"

5. **Remova Imagens (se necessário)**
   - Clique no X vermelho no canto superior direito da imagem
   - A imagem será removida permanentemente

6. **Salve o Imóvel**
   - Clique em "Salvar"
   - A imagem de capa será usada como imagem principal do card

### Campo URL da Imagem (Alternativo)

- **Quando usar:** Se você preferir usar URLs de imagens externas ou do servidor
- **Como usar:** Cole o caminho da imagem (ex: `/modern-apartment.jpg`)
- **Prioridade:** Se houver imagens na galeria, elas têm prioridade sobre a URL

## 🔧 Detalhes Técnicos

### Armazenamento
- **Formato:** Base64 (imagens convertidas para texto)
- **Local:** localStorage do navegador
- **Vantagens:** Não precisa de servidor para armazenar imagens
- **Limitações:** 
  - Máximo ~5-10MB total no localStorage
  - Recomendado: 5-10 imagens por imóvel
  - Tamanho máximo: 2MB por imagem

### Estrutura de Dados

```typescript
interface Property {
  // ... outros campos
  images?: string[]           // Array de imagens em base64
  coverImageIndex?: number    // Índice da imagem de capa (0-based)
  image: string              // Imagem principal (gerada da capa)
}
```

### Otimizações Automáticas
- ✅ Validação de tipo de arquivo
- ✅ Validação de tamanho (máx 2MB)
- ✅ Conversão automática para base64
- ✅ Atualização automática da imagem principal

## 💡 Dicas de Uso

### Para Melhor Performance:
1. **Comprima as imagens antes do upload**
   - Use ferramentas online como TinyPNG, Squoosh
   - Tamanho recomendado: 800x600px ou menor
   - Isso reduzirá o uso do localStorage

2. **Quantidade recomendada**
   - 3-5 imagens por imóvel é ideal
   - Máximo de 10 imagens por imóvel

3. **Formatos recomendados**
   - JPEG/JPG: Melhor para fotos
   - WebP: Melhor compressão
   - PNG: Para imagens com transparência

### Organização:
1. **Primeira imagem = Capa**
   - Escolha a melhor foto como primeira
   - Ela aparecerá nos cards de listagem

2. **Ordem importa**
   - As imagens serão mostradas na ordem em que foram adicionadas
   - Use a primeira posição para a foto mais atraente

## 🚀 Funcionalidades Futuras (Possíveis Melhorias)

- [ ] Reordenar imagens por drag & drop
- [ ] Crop/edição básica de imagens
- [ ] Upload para servidor/CDN
- [ ] Compressão automática no cliente
- [ ] Preview em modal maior
- [ ] Suporte para vídeos

## 🐛 Solução de Problemas

### "Imagem muito grande"
**Solução:** Reduza o tamanho da imagem antes do upload. Use ferramentas como:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- Photoshop/GIMP com qualidade 80-85%

### "Erro ao processar imagens"
**Solução:** 
- Verifique se o arquivo é uma imagem válida
- Tente fazer upload de uma imagem por vez
- Limpe o cache do navegador se necessário

### "Imagens não aparecem nos cards"
**Solução:**
- Certifique-se de salvar após fazer upload
- Verifique se definiu uma imagem como capa (⭐)
- Recarregue a página

### "localStorage cheio"
**Solução:**
- Remova imagens não utilizadas
- Delete imóveis antigos
- Comprima as imagens antes do upload

## 📱 Compatibilidade

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile (limitado pelo tamanho do localStorage)

---

**Desenvolvido com:** React, Next.js, FileReader API, localStorage
**Versão:** 2.1
**Data:** Janeiro 2025

