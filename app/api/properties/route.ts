import { NextResponse } from 'next/server'

// Em produção na Vercel, use Vercel KV ou outro banco
// Por enquanto, vamos usar uma solução simples com headers de cache

let propertiesCache: any = null

export async function GET() {
  // Retorna dados do cache ou dados iniciais
  if (propertiesCache) {
    return NextResponse.json(propertiesCache)
  }
  
  // Dados iniciais serão carregados do localStorage no cliente
  return NextResponse.json({ properties: [], version: "2.1" })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Armazena no cache (temporário - em produção use um banco real)
    propertiesCache = data
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 }
    )
  }
}

export const runtime = 'edge'

