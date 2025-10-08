# 🔐 Admin Dashboard - Kakodacury

## 🚀 Como Acessar

### URL
```
http://localhost:3000/admin
```
**Ou em produção:**
```
https://seu-dominio.vercel.app/admin
```

### Credenciais Padrão
- **Usuário:** `admin`
- **Senha:** `admin`

---

## 📋 Funcionalidades

### 1. **Dashboard Principal**
- ✅ Estatísticas gerais (total de imóveis, em construção, prontos)
- ✅ Lista completa de imóveis cadastrados
- ✅ Busca e filtragem

### 2. **Adicionar Imóvel**
Clique no botão **"Adicionar Novo Imóvel"** e preencha:
- Nome do empreendimento
- Localização
- Preço (ex: R$ 266.000)
- Status: `Em Construção` | `Pronto para Morar` | `Lançamento` | `Em Breve`
- Zona: `Sul` | `Norte` | `Leste` | `Oeste` | `Centro`
- Badge (ex: "Minha Casa Minha Vida")
- Número de quartos
- Número de banheiros
- Área (ex: 45m²)
- URL da imagem (ex: `/apartment.jpg`)

### 3. **Editar Imóvel**
- Clique no ícone de **lápis** (✏️) no card do imóvel
- Modifique os campos desejados
- Clique em **"Salvar"**

### 4. **Excluir Imóvel**
- Clique no ícone de **lixeira** (🗑️)
- Confirme a exclusão

### 5. **Status Disponíveis**
Os status têm cores automáticas:
- 🟠 **Em Construção** → Laranja
- 🟢 **Pronto para Morar** → Verde
- 🔵 **Lançamento** → Azul
- ⚪ **Em Breve** → Cinza

---

## 🖼️ Como Adicionar Imagens

### Opção 1: Usar Imagens Locais
1. Coloque a imagem na pasta `public/`
2. Use o caminho: `/nome-da-imagem.jpg`

Exemplo:
```
/modern-apartment-building.jpg
```

### Opção 2: Usar URL Externa
```
https://seu-site.com/imagem.jpg
```

---

## 💾 Persistência de Dados

### Em Desenvolvimento (Local)
- ✅ Os dados são salvos no **localStorage** do navegador
- ✅ Persistem entre recarregamentos da página
- ⚠️ **ATENÇÃO:** Se limpar o cache do navegador, os dados serão perdidos

### Em Produção (Vercel)
- ❌ **localStorage NÃO funciona** em produção
- ⚠️ Cada usuário terá seus próprios dados (não compartilhados)
- ⚠️ Novos deploys resetam os dados

**Para produção REAL, você DEVE:**
1. Ler o arquivo `ADMIN_DEPLOY_GUIDE.md`
2. Escolher uma solução de banco de dados (Vercel KV recomendado)
3. Configurar a persistência real

---

## 🔒 Segurança

### ⚠️ IMPORTANTE - Antes do Deploy

A senha padrão `admin/admin` é **INSEGURA** para produção!

**Mude imediatamente:**

1. **Edite `hooks/use-auth.ts`:**
```typescript
const login = (username: string, password: string) => {
  if (username === "seu_usuario_seguro" && password === "sua_senha_forte_aqui") {
    // ...
  }
}
```

2. **Ou use variáveis de ambiente:**
```env
# .env.local
NEXT_PUBLIC_ADMIN_USER=admin_real
NEXT_PUBLIC_ADMIN_PASS=senha_super_secreta_123
```

3. **Melhor ainda: Use NextAuth.js** (veja `ADMIN_DEPLOY_GUIDE.md`)

---

## 🎨 Customização

### Mudar Cores dos Status
Edite em `app/admin/page.tsx`:
```typescript
let statusColor = "bg-gray-600"
if (status === "Em Construção") statusColor = "bg-orange-600"
else if (status === "Pronto para Morar") statusColor = "bg-green-600"
// Adicione mais cores aqui
```

### Adicionar Novos Campos
1. Edite `hooks/use-properties.ts` (interface `Property`)
2. Adicione o campo no formulário em `app/admin/page.tsx`
3. Atualize a exibição dos cards

---

## 📱 Responsividade

O dashboard é **totalmente responsivo**:
- ✅ Desktop: Layout completo
- ✅ Tablet: Grid adaptado
- ✅ Mobile: Cards empilhados

---

## 🐛 Problemas Comuns

### "Dados não aparecem na página principal"
- Verifique se os imóveis têm `id` único
- Confirme que salvou corretamente
- Recarregue a página principal (`/`)

### "Imagem não carrega"
- Certifique-se que o caminho está correto
- Use `/` no início para imagens locais
- Verifique se a imagem existe na pasta `public/`

### "Dados sumiram após reload"
- **Local:** Normal se limpou o cache
- **Produção:** Configure banco de dados real (veja `ADMIN_DEPLOY_GUIDE.md`)

---

## 📚 Próximos Passos

1. ✅ Teste localmente o admin
2. ✅ Adicione alguns imóveis
3. ✅ Verifique na página principal
4. 📖 Leia `ADMIN_DEPLOY_GUIDE.md` para deploy
5. 🔧 Configure banco de dados (Vercel KV recomendado)
6. 🔒 Mude as credenciais de acesso
7. 🚀 Faça deploy na Vercel

---

## 🆘 Precisa de Ajuda?

Consulte os arquivos:
- `ADMIN_DEPLOY_GUIDE.md` → Deploy e banco de dados
- `PERFORMANCE_OPTIMIZATIONS.md` → Performance do site
- `CORRECOES_NAVEGACAO.md` → Correções de navegação

---

**🎉 Pronto! Seu admin está funcionando!**

Acesse: http://localhost:3000/admin


