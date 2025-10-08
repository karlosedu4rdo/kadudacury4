# 🔐 Guia de Deploy do Admin Dashboard

## ⚠️ IMPORTANTE: Persistência de Dados

Atualmente, o sistema admin usa **localStorage** para armazenar os dados dos imóveis. Isso funciona perfeitamente em **desenvolvimento local**, mas **NÃO persiste** quando hospedado na Vercel ou qualquer outro serviço.

### Por que localStorage não funciona em produção?

- ✅ **Local**: Dados salvos no navegador do seu computador
- ❌ **Vercel**: Cada usuário tem seu próprio localStorage (dados não compartilhados)
- ❌ **Deploy novo**: Reseta tudo, dados são perdidos

---

## 🚀 Soluções para Produção (Persistência Real)

### Opção 1: Vercel KV (Redis) - **Recomendado**

**Vantagens:**
- ✅ Integração nativa com Vercel
- ✅ Super rápido (Redis)
- ✅ Configuração simples
- ✅ Plano gratuito disponível

**Custo:** Grátis até 256MB

**Como Implementar:**

1. **Instale o pacote:**
```bash
pnpm install @vercel/kv
```

2. **Configure no Vercel Dashboard:**
   - Acesse seu projeto na Vercel
   - Vá em "Storage" → "Create Database" → "KV"
   - Copie as variáveis de ambiente

3. **Crie `.env.local`:**
```env
KV_URL="your-kv-url"
KV_REST_API_URL="your-api-url"
KV_REST_API_TOKEN="your-token"
KV_REST_API_READ_ONLY_TOKEN="your-readonly-token"
```

4. **Crie API Routes:**

**`app/api/properties/route.ts`:**
```typescript
import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  const properties = await kv.get('properties') || []
  return NextResponse.json(properties)
}

export async function POST(request: Request) {
  const properties = await request.json()
  await kv.set('properties', properties)
  return NextResponse.json({ success: true })
}
```

5. **Atualize o hook `use-properties.ts`:**
```typescript
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  
  // Carregar do servidor
  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data))
  }, [])

  // Salvar no servidor
  const saveProperties = async (newProperties: Property[]) => {
    setProperties(newProperties)
    await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProperties)
    })
  }
  
  // ... resto do código
}
```

---

### Opção 2: Vercel Postgres

**Vantagens:**
- ✅ Banco de dados SQL completo
- ✅ Queries complexas
- ✅ Relacional
- ✅ Plano gratuito

**Custo:** Grátis até 256MB

**Como Implementar:**

1. **Instale:**
```bash
pnpm install @vercel/postgres
```

2. **Crie tabela (SQL):**
```sql
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50),
  status_color VARCHAR(50),
  image VARCHAR(255),
  badge VARCHAR(255),
  price VARCHAR(100),
  bedrooms INTEGER,
  bathrooms INTEGER,
  area VARCHAR(50),
  zone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. **API Route:**
```typescript
import { sql } from '@vercel/postgres'

export async function GET() {
  const { rows } = await sql`SELECT * FROM properties ORDER BY id`
  return NextResponse.json(rows)
}

export async function POST(request: Request) {
  const property = await request.json()
  await sql`
    INSERT INTO properties (name, location, status, ...)
    VALUES (${property.name}, ${property.location}, ...)
  `
  return NextResponse.json({ success: true })
}
```

---

### Opção 3: Supabase - **Mais Fácil**

**Vantagens:**
- ✅ PostgreSQL gratuito
- ✅ Dashboard visual
- ✅ Autenticação incluída
- ✅ API REST automática

**Custo:** Grátis até 500MB

**Como Implementar:**

1. **Crie conta:** https://supabase.com

2. **Instale:**
```bash
pnpm install @supabase/supabase-js
```

3. **Configure `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Crie cliente:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

5. **Use no hook:**
```typescript
const { data, error } = await supabase
  .from('properties')
  .select('*')

await supabase
  .from('properties')
  .insert(newProperty)
```

---

### Opção 4: MongoDB Atlas

**Vantagens:**
- ✅ NoSQL flexível
- ✅ Plano gratuito generoso
- ✅ Escalável

**Custo:** Grátis até 512MB

**Como Implementar:**

1. **Crie cluster:** https://www.mongodb.com/atlas

2. **Instale:**
```bash
pnpm install mongodb
```

3. **Configure `.env.local`:**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
```

4. **Crie conexão:**
```typescript
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)
const db = client.db('kakodacury')

// GET
const properties = await db.collection('properties').find().toArray()

// POST
await db.collection('properties').insertOne(property)
```

---

## 🔒 Melhorar Segurança do Login

### Atual
```typescript
if (username === "admin" && password === "admin") // ❌ Inseguro
```

### Recomendado

1. **Use variáveis de ambiente:**
```typescript
// .env.local
ADMIN_USERNAME=seu_usuario_seguro
ADMIN_PASSWORD=sua_senha_hash
```

2. **Hash de senha:**
```bash
pnpm install bcrypt
```

```typescript
import bcrypt from 'bcrypt'

// Criar hash (faça isso uma vez e salve)
const hash = await bcrypt.hash('sua-senha', 10)

// Verificar login
const isValid = await bcrypt.compare(password, hash)
```

3. **Use NextAuth.js (melhor):**
```bash
pnpm install next-auth
```

---

## 📋 Checklist de Deploy

Antes de fazer deploy na Vercel:

- [ ] Escolheu uma solução de banco de dados
- [ ] Configurou as variáveis de ambiente
- [ ] Criou API routes para persistência
- [ ] Testou localmente com banco de dados
- [ ] Trocou credenciais admin padrão
- [ ] Adicionou variáveis de ambiente na Vercel
- [ ] Testou após o deploy

---

## 🎯 Quick Start - Vercel KV (Recomendado)

1. **Crie KV na Vercel:**
```bash
vercel env pull .env.local
```

2. **Instale:**
```bash
pnpm install @vercel/kv
```

3. **Copie os arquivos de exemplo:**

**`app/api/properties/route.ts`** (crie este arquivo):
```typescript
import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

const PROPERTIES_KEY = 'properties'

export async function GET() {
  try {
    const properties = await kv.get(PROPERTIES_KEY)
    return NextResponse.json(properties || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await kv.set(PROPERTIES_KEY, data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
```

4. **Atualize `hooks/use-properties.ts`:**

Substitua todo o conteúdo por:
```typescript
"use client"

import { useState, useEffect } from "react"

// ... mantenha o interface Property ...

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data.length > 0 ? data : initialProperties)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setProperties(initialProperties)
        setLoading(false)
      })
  }, [])

  const saveProperties = async (newProperties: Property[]) => {
    setProperties(newProperties)
    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProperties)
      })
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  const addProperty = (property: Omit<Property, "id">) => {
    const newId = Math.max(...properties.map(p => p.id), 0) + 1
    const newProperty = { ...property, id: newId }
    saveProperties([...properties, newProperty])
  }

  const updateProperty = (id: number, property: Partial<Property>) => {
    const updated = properties.map(p =>
      p.id === id ? { ...p, ...property } : p
    )
    saveProperties(updated)
  }

  const deleteProperty = (id: number) => {
    saveProperties(properties.filter(p => p.id !== id))
  }

  return {
    properties,
    loading,
    addProperty,
    updateProperty,
    deleteProperty
  }
}
```

5. **Deploy:**
```bash
git add .
git commit -m "Add admin dashboard with Vercel KV"
git push
```

---

## 📚 Links Úteis

- [Vercel KV Docs](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Docs](https://supabase.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [NextAuth.js](https://next-auth.js.org/)

---

## 🆘 Suporte

Se precisar de ajuda, consulte:
1. Documentação oficial da solução escolhida
2. Discord da Vercel
3. Stack Overflow

---

**⚠️ LEMBRE-SE:** localStorage é TEMPORÁRIO. Para produção, você DEVE usar uma das soluções acima!


